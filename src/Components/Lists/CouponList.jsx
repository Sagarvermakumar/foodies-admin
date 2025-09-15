import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCoupon, getAllCoupons } from '../../features/coupon/couponAction'
import { selectCouponPagination } from '../../features/coupon/couponSelector'
import { setCouponPage } from '../../features/coupon/couponSlice'
import DeleteConfirmationModal from '../common/DeleteConfirmation'
import Pagination from '../common/Pagination'
const CouponList = ({ coupons }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pagination = useSelector(selectCouponPagination)

  const [deletingId, setDeletingId] = useState(null)

  const [coupon, setCoupon] = useState(null)

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  // open delete confirmation of coupon modal
  const handleOpenDeleteCouponModal = (coupon) => {
    setCoupon(coupon)
    onOpenDelete()
  }
  const handleDeleteCoupon = () => {
    dispatch(deleteCoupon(coupon._id))

    dispatch(deleteCoupon(coupon._id)).finally(() => setDeletingId(null))
  }

  if (!coupons || coupons.length === 0) {
    return <Text textAlign="center">No coupons available</Text>
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {coupons.map((coupon) => (
        <Card
          key={coupon._id}
          borderWidth="1px"
          borderRadius="lg"
          shadow="md"
          bg={'transparent'}
          color={'gray.300'}
          borderColor={'gray.700'}
          _hover={{ shadow: 'lg' }}
        >
          <CardHeader>
            <Heading fontSize="xl" color={'brand.800'}>
              {coupon.code}
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {coupon.title}
            </Text>
          </CardHeader>
          <Divider color={'gray.600'} />

          <CardBody m={0}>
            <Stack spacing={2}>
              <Text>
                <b>Type:</b> {coupon.type}{' '}
                {coupon.type === 'FLAT'
                  ? `₹${coupon.value}`
                  : `${coupon.value}%`}
              </Text>
              <Text>
                <b>Min Order:</b> ₹{coupon.minOrder}
              </Text>
              <Text>
                <b>Max Discount:</b> ₹{coupon.maxDiscount}
              </Text>
              <Text>
                <b>Usage Limit:</b> {coupon.usageLimit} (Per User:{' '}
                {coupon.perUserLimit})
              </Text>
              <Text>
                <b>Valid From:</b>{' '}
                {new Date(coupon.startAt).toLocaleDateString()}
              </Text>
              <Text>
                <b>Valid Till:</b> {new Date(coupon.endAt).toLocaleDateString()}
              </Text>
              <Badge
                colorScheme={coupon.active ? 'green' : 'red'}
                alignSelf="flex-start"
              >
                {coupon.active ? 'Active' : 'Inactive'}
              </Badge>
            </Stack>
          </CardBody>
          <Divider color={'gray.600'} />
          <CardFooter>
            <Flex w={'full'} gap={2} justify={'space-between'} wrap="wrap">
              <Button
                leftIcon={<MdEdit />}
                size="sm"
                w={{ base: 'full', md: 'fit-content' }}
                variant={'outline'}
                // isLoading={isLoadingMarkOrderPicked}
                loadingText="Updating..."
                onClick={() => navigate(`/coupon/edit/${coupon._id}`)}
              >
                Edit
              </Button>
              <Button
                leftIcon={<MdDelete />}
                size="sm"
                w={{ base: 'full', md: 'fit-content' }}
                onClick={() => handleOpenDeleteCouponModal(coupon)}
                isLoading={deletingId === coupon._id}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      ))}

      <Pagination
        pagination={pagination}
        fetchAction={getAllCoupons}
        setPageAction={setCouponPage}
      />

      <DeleteConfirmationModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onDelete={handleDeleteCoupon}
        entityName={coupon?.code}
        entityLabel={'coupon'}
      />
    </SimpleGrid>
  )
}

export default CouponList

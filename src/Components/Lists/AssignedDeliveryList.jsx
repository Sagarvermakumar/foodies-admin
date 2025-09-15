import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdOpenInNew } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  markOrderDelivered,
  markOrderPicked,
  updateLocation,
} from '../../features/delevery/action'
import { useGeolocation } from '../../hook/useGeolocation'

const AssignedDeliveryList = ({ orders }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { coordinates, error } = useGeolocation()
  const [orderIdPicked, setOrderIdPicked] = useState(null)
  const [orderIdDelivered, setOrderIdDelivered] = useState(null)
  const [orderIdUpdateLocation, setOrderIdUpdateLocation] = useState(null)

  const handleUpdateLocation = (orderId) => {
    if (error) {
      console.error('Geolocation error:', error)
      return
    }
    try {
      setOrderIdUpdateLocation(orderId)
      dispatch(updateLocation({ orderId, coordinates })).unwrap()
    } catch (error) {
      console.log(error)
      setOrderIdUpdateLocation(null)
    } finally {
      setOrderIdUpdateLocation(null)
    }
  }

  const handleMarkAsPickedOrder = async (orderId, currentStatus) => {
    try {
      if (currentStatus === 'PICKED') {
        return toast.error('Order status is already marked as Picked.!')
      }
      if (currentStatus === 'DELIVERED') {
        return toast.error(
          'Order is already delivered. You cannot update the status further.'
        )
      }

      setOrderIdPicked(orderId)
      await dispatch(markOrderPicked(orderId)).unwrap()
    } catch (error) {
      console.log(error)
      setOrderIdPicked(null)
    } finally {
      setOrderIdPicked(null)
    }
  }

  const handleMarkAsDeliveredOrder = async (orderId, currentStatus) => {
    try {
      if (currentStatus === 'DELIVERED') {
        return toast.error('Order status is already marked as Delivered!')
      }
      setOrderIdDelivered(orderId)
      await dispatch(markOrderDelivered(orderId)).unwrap()
    } catch (error) {
      console.log(error)
      setOrderIdDelivered(null)
    } finally {
      setOrderIdDelivered(null)
    }
  }

  const handleOpenLocationInMap = (location) => {
    console.log(location)
    if (location && location.length > 0) {
      const [lat, long] = location
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
      window.open(url, '_blank')
    } else {
      toast.error('No address found for this user.')
    }
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
      {orders.map((order) => (
        <Card
          key={order._id + order.name}
          borderWidth="1px"
          boxShadow="lg"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="550px"
          border=".5px solid "
          borderColor={'gray.600'}
          borderRadius="xl"
          shadow="md"
          bg="blackAlpha.300"
          color={'gray.300'}
        >
          <CardHeader borderBottomWidth="1px" borderColor={'gray.600'} pb={2}>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                📦{order.orderNo}
              </Text>
              <Badge
                colorScheme={
                  order.currentOrderStatus === 'OUT_FOR_DELIVERY'
                    ? 'orange'
                    : order.currentOrderStatus === 'DELIVERED'
                      ? 'green'
                      : 'blue'
                }
              >
                {order.currentOrderStatus}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Placed On: {new Date(order.createdAt).toLocaleString()}
            </Text>
          </CardHeader>
          <CardBody>
            {/* Customer Details */}
            <Stack spacing={1}>
              <HStack justify={'space-between'}>
                <Text fontWeight="bold" mb={1} color={'brand.600'} >
                  👤 Customer Details
                </Text>
                <Tooltip label="View user full Details" fontSize="md">
                  <IconButton
                    size={'sm'}
                    variant={'outline'}
                    onClick={() => navigate(`/users/${order?.user?._id}`)}
                  >
                    <MdOpenInNew />
                  </IconButton>
                </Tooltip>
              </HStack>
              <Text>Name: {order.user?.name}</Text>
              <Link href={`mailto:${order.user?.email}`}>
                <Text
                  _hover={{
                    color: 'brand.800',
                    transform: 'scale(1.02)',
                    transition: 'all .3s',
                  }}
                >
                  Email: {order.user?.email}
                </Text>
              </Link>
              <Link href={`tel:${order.user.phone}`}>
                <Text
                  _hover={{
                    color: 'brand.800',
                    transform: 'scale(1.02)',
                    transition: 'all .3s',
                  }}
                >
                  Phone: {order.user?.phone}
                </Text>
              </Link>
            </Stack>
            <Divider my={2} borderBottomWidth="1px" borderColor={'gray.600'} />

            {/* Address */}
            <Box mb={4}>
              <HStack>

                <Text fontWeight="bold" mb={1} color={'brand.600'}>
                  {order.address.label === "Home" ? "🏠" : "🏢"} Delivery Address
                </Text>

              </HStack>
              <Text>
                {order?.address?.addressLine}
                {order?.address?.street && `, ${order?.address?.street}`}
              </Text>
              {order?.address?.landmark && (
                <Text>Landmark: {order?.address?.landmark}</Text>
              )}
              <Text>
                {order?.address?.city && `${order?.address?.city}, `}
                {order?.address?.state && `${order?.address?.state} - `}
                {order?.address?.pinCode}
              </Text>

            </Box>

            <Divider my={2} borderBottomWidth="1px" borderColor={'gray.600'} />

            {/* Items */}
            <Box >
              <Text fontWeight="bold" mb={2} fontSize={'md'} color={'brand.900'}>
                🧾 Items:
              </Text>
              <SimpleGrid height={'75px'} overflowX={'hidden'}  >
                {order.items.map((itemWrap) => (
                  <Flex key={itemWrap._id} gap={3} mb={3} align="center">
                    <Image
                      src={itemWrap?.item?.image}
                      alt={itemWrap?.item?.name}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="semibold" fontSize={'sm'}>
                        {itemWrap.item?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Qty: {itemWrap?.qty} | ₹{itemWrap.unitPrice}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>

            </Box>

            <Divider my={2} borderBottomWidth="1px" borderColor={'gray.600'} />

            <Stack spacing={1}>
              <HStack justify={'space-between'}>
                <Text fontWeight="thin" fontSize={'sm'}>
                  Sub Total{' '}
                </Text>
                <Text fontWeight="thin" fontSize={'sm'}>
                  {' '}
                  ₹{order?.charges?.subTotal || 0}
                </Text>
              </HStack>
              <HStack justify={'space-between'}>
                <Text fontWeight="thin" fontSize={'sm'}>
                  Discount{' '}
                </Text>
                <Text fontWeight="thin" fontSize={'sm'}>
                  {' '}
                  ₹{order?.charges?.discount || 0}
                </Text>
              </HStack>
              <HStack justify={'space-between'}>
                <Text fontWeight="thin" fontSize={'sm'}>
                  Tax{' '}
                </Text>
                <Text fontWeight="thin" fontSize={'sm'}>
                  {' '}
                  ₹{parseInt(order?.charges?.tax || 0)}
                </Text>
              </HStack>
              <HStack justify={'space-between'}>
                <Text fontWeight="thin" fontSize={'sm'}>
                  Delivery Fee{' '}
                </Text>
                <Text fontWeight="bold" fontSize={'sm'}>
                  {' '}
                  ₹{order?.charges?.deliveryFee || 0}
                </Text>
              </HStack>

              <HStack justify={'space-between'}>
                <Text fontWeight="bold" fontSize={'sm'}>
                  Grand Total{' '}
                </Text>
                <Text fontWeight="bold" fontSize={'sm'}>
                  {' '}
                  ₹{order?.charges?.grandTotal || 'NA1'}
                </Text>
              </HStack>
            </Stack>
            <Badge mt={2} colorScheme="purple">
              Payment: {order.payment.method} ({order.payment.status})
            </Badge>
            {/* Note */}
            {order.note && (
              <Box my={4}>
                <Text fontWeight="bold">📝 Customer Note:</Text>
                <Text>{order.note}</Text>
              </Box>
            )}
          </CardBody>

          <Divider color={'gray.800'} />

          {/* Timeline */}

          <CardFooter>
            {/* Action Buttons */}
            <Stack w={'full'} wrap="wrap">
              <HStack justify={'space-between'}>
                <Button
                  size="sm"
                  disabled={order?.currentOrderStatus === 'PICKED'}
                  variant={'outline'}
                  isLoading={order?._id === orderIdPicked}
                  loadingText="Updating..."
                  onClick={() =>
                    handleMarkAsPickedOrder(
                      order._id,
                      order?.currentOrderStatus
                    )
                  }
                >
                  Mark as Picked
                </Button>
                <Button
                  size="sm"
                  variant={'outline'}
                  disabled={order?.currentOrderStatus === 'DELIVERED'}
                  onClick={() =>
                    dispatch(
                      handleMarkAsDeliveredOrder(
                        order?._id,
                        order?.currentOrderStatus
                      )
                    )
                  }
                  isLoading={order?._id === orderIdDelivered}
                  loadingText="Delivered..."
                >
                  Mark As Delivered
                </Button>
              </HStack>
              <HStack justify={'space-between'}>
                <Button
                  size="sm"
                  variant={'outline'}
                  onClick={() => handleUpdateLocation(order._id)}
                  isLoading={order?._id === orderIdUpdateLocation}
                  loadingText="Updating..."
                >
                  Update Location
                </Button>
                <Button
                  size="sm"
                  variant={'outline'}
                  onClick={() =>
                    handleOpenLocationInMap(
                      order?.delivery?.liveLocation?.coordinates
                    )
                  }
                >
                  Open Location in
                </Button>
              </HStack>
            </Stack>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default AssignedDeliveryList

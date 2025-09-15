import {
  Badge,
  Box,
  HStack,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  deleteCategory,
  getAllItemCategories,
} from '../../features/category/categoryAction'
import { selectPagination } from '../../features/category/categorySelector'
import { setCategoryPage } from '../../features/category/categorySlice'
import DeleteConfirmationModal from '../common/DeleteConfirmation'
import Pagination from '../common/Pagination'
const CategoryList = ({ categories }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const pagination = useSelector(selectPagination)
  const [category, setCategory] = useState(null)

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  // open delete confirmation of category modal
  const handleOpenDeleteCategoryModal = (category) => {
    setCategory(category)
    onOpenDelete()
  }
  const handleDeleteCategory = () => {
    dispatch(deleteCategory(category._id))
  }
  return (
    <Box p={6}>
      {/* categories list  */}
      <Table variant="simple" bg={'transparent'}>
        <Thead>
          <Tr>
            <Th>Order</Th>
            <Th>Avatar</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Items</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((cat) => (
            <Tr key={cat._id}>
              <Td>{cat?.sortOrder}</Td>
              <Td>
                <Image
                  src={cat?.image.url}
                  alt={cat.name}
                  boxSize="50px"
                  borderRadius="full"
                />
              </Td>
              <Td>{cat.name}</Td>
              <Td>{cat.slug}</Td>
              <Td>{cat?.availableItems}</Td>
              <Td>
                {cat.active ? (
                  <Badge colorScheme="green">Active</Badge>
                ) : (
                  <Badge colorScheme="red">Inactive</Badge>
                )}
              </Td>
              <Td>
                <HStack>
                  <IconButton
                    icon={<MdEdit />}
                    onClick={() => navigate(`/category/edit/${cat._id}`)}
                    variant={'outline'}
                  />
                  <IconButton
                    icon={<MdDelete />}
                    onClick={() => handleOpenDeleteCategoryModal(cat)}
                    variant={'outline'}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* pagination  */}
      <Pagination
        pagination={pagination}
        fetchAction={getAllItemCategories}
        setPageAction={setCategoryPage}
      />

      {/* delete confirmation modal  */}
      <DeleteConfirmationModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onDelete={handleDeleteCategory}
        entityName={category?.name}
        entityLabel={'Category'}
      />
    </Box>
  )
}

export default CategoryList

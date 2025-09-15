import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MakeCategoryLoadingSelector, selectCategoryList, selectPagination } from '../../features/category/categorySelector';
import CategoryList from '../../Components/Lists/CategoryList';
import { getAllItemCategories } from '../../features/category/categoryAction';
import Pagination from '../../Components/common/Pagination';
import { setPagination } from '../../features/orders/orderSlice';
import { Box } from '@chakra-ui/react';
import Header from '../../Components/common/Heading';
import CategoryListSkeleton from '../../Components/Skeletons/CategoryListSkeleton ';
import EmptyState from '../../Components/common/EmptyState';

const Categories = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector(selectCategoryList);
  const isCategoryLoading = useSelector(MakeCategoryLoadingSelector('get'))
  const pagination = useSelector(selectPagination)


  useEffect(() => {
    dispatch(getAllItemCategories())
  }, [dispatch])

  return (
    <Box>
      {/* Header + Date Picker */}

      <Header
        title={"Manage Categories"}
        subtitle={"Track, manage, and update all food orders"}
      />



      {/* Orders List or Skeleton */}
      <Box flex="1" overflowX="auto">
        {isCategoryLoading ? (
          <CategoryListSkeleton />
        ) : categoryList && categoryList?.length > 0 ? (
          <>
            <CategoryList categories={categoryList} />
            <Box>
              <Pagination
                pagination={pagination}
                onPageChange={(page) =>
                  dispatch(setPagination({ ...pagination, page }))
                }
              />
            </Box>
          </>
        ) : (
          <EmptyState
            label="Categories"
            subLabel="Maybe Categories deleted or does not exist."
          />
        )}
      </Box>
    </Box>
  )
}

export default Categories
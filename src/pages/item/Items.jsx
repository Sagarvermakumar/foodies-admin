import { Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../../Components/common/EmptyState';
import Header from '../../Components/common/Heading';
import MenuList from '../../Components/Lists/MenuList';
import MenuSkeleton from '../../Components/Skeletons/MenuSkeleton'; // 👈 new skeleton import
import { getAllItems } from '../../features/item/ItemAction';
import { MakeSelectItemLoading, SelectItems, SelectPagination } from '../../features/item/itemSelector';

const Items = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const itemList = useSelector(SelectItems);
  const pagination = useSelector(SelectPagination)
  const itemsLoading = useSelector(MakeSelectItemLoading('getAll'))

  console.log(itemList)
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const filteredItems = itemList?.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  )
  useEffect(() => {
    dispatch(getAllItems(query));
  }, [dispatch, query]);

  return (
    <>
      {/* Header + Search Input */}
      <Stack
        justify={{ sm: "start", md: "start", lg: "space-between" }}
        alignItems={{ base: "start", md: "start", lg: "center" }}
        flexDir={{ base: 'column', md: 'column', lg: "row" }}
      >
        <Header title={"All Menu Items"} subtitle={"Browse and manage all available food items"} />
        <Input
          isRequired
          placeholder="Search by name, price or category..."
          type="text"
          value={query}
          onChange={handleChange}
          mb={6}

          py={4}
          w={{ base: 'full', md: "full", lg: "220px" }}
        />
      </Stack>

      {/* Menu List / Skeleton / No Data */}
      {itemsLoading ? (
        <MenuSkeleton />
      ) : itemList?.length > 0 ? (
        <MenuList items={filteredItems} query={query} handleChange={handleChange} pagination={pagination} />
      ) : (
        <EmptyState
          label="Menu Item"
          redirectUrl="/item/add"
          subLabel="Maybe the item was deleted or does not exist."
          btnLabel="Add Item"
        />
      )}
    </>
  );
};


export default Items
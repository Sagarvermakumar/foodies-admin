import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FileEdit,
  LucideDelete,
  StarsIcon,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteItem,
  getAllItems,
  toggleItemAvailability
} from "../../features/item/ItemAction";
import { setItemPage } from '../../features/item/ItemSlice';
import { MakeSelectItemLoading } from "../../features/item/itemSelector";
import ToggleMenuItemAvailabilityModal from "../Modals/ToggleMenuItemAvailabilityModal";
import DeleteConfirmationModal from "../common/DeleteConfirmation";
import Pagination from "../common/Pagination";
const MenuList = ({ items, pagination }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [previewUrl, setPreviewUrl] = useState("");
  const isDeletingItem = useSelector(MakeSelectItemLoading("delete"));

  const [menuitemId, setMenuitemId] = useState("");
  const [currentAvailability, setCurrentAvailability] = useState(false);

  const [togglingItemId, setTogglingItemId] = useState(null);
  const [item, setItem] = useState(null)

  const handleOpenToggleModal = (item) => {
    setMenuitemId(item._id);
    setCurrentAvailability(item.isAvailable);
    onOpen();
  };


  // toggle item Availability
  const handleToggleMenuItemAvailability = async () => {
    try {
      await dispatch(
        toggleItemAvailability(menuitemId, currentAvailability)
      ).unwrap();
    } catch (error) {
      console.error("Failed to toggle item availability:", error);
    } finally {
      setTogglingItemId(null);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };



  // open delete confirmation item modal
  const handleOpenDeleteItemModal = (item) => {
    setItem(item);
    onOpenDelete();
  };
  //Ye function order ko delete karta hai (sirf cancelled orders allowed)
  const handleDeleteItem = () => {
    dispatch(deleteItem(item._id))

  };


  return (
    <Box>


      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
        columnGap={8}
        rowGap={8}
      >
        {items.map((item) => (
          <Box
            key={item._id}
            borderRadius="md"
            overflow="hidden"
            boxShadow="xl"
            bg="whiteAlpha.200"
            color="white"
            _hover={{
              boxShadow: " 0 4px 60px rgba(252, 189, 1, 0.33)",
              transform: "scale(1.02)",
              transition: "0.2s ease-in-out",
            }}
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.name}
              objectFit="fill"
              width="100%"
              height="250px"
              borderRadius="md"
              mb={3}
            />

            <Box p={4}>
              {/* Title & Price */}
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xl" fontWeight="bold">
                  {item.name}
                </Text>
                <Badge
                  px={3}
                  py={1}
                  rounded="full"
                  colorScheme="orange"
                  fontSize="md"
                >
                  ₹{parseInt(item.price)}
                </Badge>
              </Flex>

              {/* Discount */}
              {item.discount > 0 && (
                <Text fontSize="sm" color="orange.300" mb={2}>
                  🎉 {item.discount}% OFF
                </Text>
              )}

              {/* Badges */}
              <Flex flexWrap="wrap" gap={2} mb={3}>
                {item.isAvailable ? (
                  <Badge colorScheme="green" rounded="md">
                    Available
                  </Badge>
                ) : (
                  <Badge colorScheme="red" rounded="md">
                    Unavailable
                  </Badge>
                )}
                {item.isVeg ? (
                  <Badge colorScheme="green" rounded="md">
                    Vegetarian
                  </Badge>
                ) : (
                  <Badge colorScheme="purple" rounded="md">
                    Non-Veg
                  </Badge>
                )}
                {item.category?.name && (
                  <Badge colorScheme="blue" rounded="md">
                    {item.category.name}
                  </Badge>
                )}
              </Flex>

              {/* Description */}
              <Text fontSize="sm" noOfLines={2} mb={2} color="gray.300">
                {item.description}
              </Text>

              {/* Variations */}
              {item.variations?.length > 0 && (
                <Box mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.200" mb={1}>
                    Variations:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {item.variations.map((v) => (
                      <Badge key={v._id} colorScheme="cyan" rounded="md">
                        {v.name} - ₹{v.price}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}

              {/* Addons */}
              {item.addons?.length > 0 && (
                <Box mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.200" mb={1}>
                    Add-ons:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {item.addons.map((a) => (
                      <Badge key={a._id} colorScheme="pink" rounded="md">
                        {a.name} (+₹{a.price})
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}

              {/* Info */}
              <Text fontSize="xs" mb={1} color="gray.400">
                By: <b>{item.createdBy.name}</b> ({item.createdBy.role})
              </Text>
              <Text fontSize="xs" color="gray.400">
                Outlet: <b>{item.outlet.name}</b>
              </Text>
              <Divider w={'full'} my={4} bg={'gray.900'} />
              {/* Action Buttons */}
              <Flex
                justify="space-between"
                gap={3}
                mt={4}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Button
                  size="sm"
                  leftIcon={<FileEdit size={"18px"} />}
                  colorScheme="yellow"
                  onClick={() => navigate(`/item/edit/${item._id}`)}
                >
                  Edit
                </Button>

                <Button
                  onClick={() => handleOpenDeleteItemModal(item)}
                  leftIcon={<LucideDelete size={"18px"} />}
                  size="sm"
                  colorScheme="red"
                  isLoading={isDeletingItem}
                  loadingText="Deleting..."
                >
                  Delete
                </Button>

                <Button
                  leftIcon={
                    item.isAvailable ? (
                      <ToggleRight size={"20px"} />
                    ) : (
                      <ToggleLeft size={"20px"} />
                    )
                  }
                  size="sm"
                  colorScheme={item.isAvailable ? "red" : "green"}
                  isLoading={togglingItemId === item._id}
                  loadingText={item.isAvailable ? "Disabling..." : "Enabling..."}
                  onClick={() => handleOpenToggleModal(item)}
                >
                  {item.isAvailable ? "Disable" : "Enable"}
                </Button>
                <Tooltip label="Review and reply">
                  <IconButton
                    icon={<StarsIcon size={"18px"} />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => navigate(`/review/${item.name}/${item._id}`)}
                    aria-label="Review and reply"
                  />
                </Tooltip>
              </Flex>
            </Box>
          </Box>

        ))}
      </SimpleGrid>
      <Pagination pagination={pagination} fetchAction={getAllItems} setPageAction={setItemPage} />
      {items && (
        <ToggleMenuItemAvailabilityModal
          isOpen={isOpen}
          onClose={onClose}
          currentAvailability={
            currentAvailability ? "available" : "unavailable"
          }
          onUpdate={handleToggleMenuItemAvailability}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onDelete={handleDeleteItem}
        entityName={item?.name}
        entityLabel={"Item"}
      />
    </Box>
  );
};

export default MenuList;

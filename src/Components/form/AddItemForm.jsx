import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { ImagePlusIcon, ImageUpscaleIcon, LucideStepBack, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaBackspace, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllItemCategories } from "../../features/category/categoryAction";
import { selectCategoryList } from "../../features/category/categorySelector";
import {
  createItem,
  editItem,
  getItemDetails
} from "../../features/item/ItemAction";
import {
  MakeSelectItemLoading,
  selectItemDetails,
} from "../../features/item/itemSelector";
import { getAllOutlets } from "../../features/outlet/action";
import { selectOutletList } from "../../features/outlet/selector";
import { itemValidationSchema } from "../../validation/item";
import Header from "../common/Heading";

// Yup validation schema

const ItemForm = () => {
  const currentItem = useSelector(selectItemDetails);

  const itemId = useParams().id;
  const dispatch = useDispatch();
  const outletList = useSelector(selectOutletList);
  const categoryList = useSelector(selectCategoryList);
  const isLoadingItemDetails = useSelector(MakeSelectItemLoading("details"));
  const isCreatingItem = useSelector(MakeSelectItemLoading("addItem"));
  const isUpdatingItem = useSelector(MakeSelectItemLoading("editItem"));

  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    const isValidId = itemId && /^[0-9a-fA-F]{24}$/.test(itemId);
    if (isValidId) {
      dispatch(getItemDetails(itemId));
      dispatch(getAllOutlets());
      dispatch(getAllItemCategories());
    } else {
      console.warn("Invalid itemId, skipping fetch");
      dispatch(getAllOutlets());
      dispatch(getAllItemCategories())
    }
  }, [dispatch, itemId]);


  if (isLoadingItemDetails) {
    return <Text>Loading Item Details...</Text>;
  }

  if (itemId && !currentItem) {
    return <Text>Invalid Item ID : {itemId}</Text>;
  }

  return (
    <Card bg="transparent" color={"gray.200"} p={0} m={0} >
      <Formik
        initialValues={{
          name: currentItem?.name || "Name",
          description: currentItem?.description || "Desc",
          price: currentItem?.price || "99",
          image: currentItem?.image || null,
          isVeg: currentItem?.isVeg || false,
          variations: currentItem?.variations || [],
          addons: currentItem?.addons || [],
          discount: currentItem?.discount || 19,
          lowStockThreshold: currentItem?.lowStockThreshold || 10,
          outlet: currentItem?.outlet || "",
          category: currentItem?.category || "",
        }}
        validationSchema={itemValidationSchema}
        enableReinitialize={true}
        onSubmit={async (values, action) => {
          try {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("isVeg", values.isVeg);
            formData.append("discount", values.discount);
            formData.append("lowStockThreshold", values.lowStockThreshold);
            formData.append("outlet", values.outlet);
            formData.append("category", values.category);

            // Arrays → stringify
            formData.append("variations", JSON.stringify(values.variations || []));
            formData.append("addons", JSON.stringify(values.addons || []));

            // Image → only if File hai
            if (values.image instanceof File) {
              formData.append("image", values.image);
            }
            if (itemId) {
              await dispatch(editItem({ itemId, data: formData })).unwrap();
            } else {
              dispatch(createItem(formData));
            }

            action.setSubmitting(false);
          } catch (error) {
            console.log(error)
          }
        }}

      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleBlur,
          resetForm,
        }) => {

          const handleChange = (e) => {
            const file = e.currentTarget.files[0];
            if (file) {
              setFieldValue("image", file);
              setPreviewUrl(URL.createObjectURL(file));
            }
          };
          return (
            <Form>
              <CardHeader p={0} m={0}>
                <Header
                  title={itemId ? "Edit Menu Item" : "Add New Menu Item"}
                  subtitle={
                    itemId
                      ? "Update the details of the menu item"
                      : "Fill in the details to create a new menu item"
                  }
                />
              </CardHeader>
              <CardBody p={0} m={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box position="relative" w="100%" maxW="220px" mb={4}>
                    {!values.image ? (
                      <FormLabel
                        htmlFor="input"
                        bg="rgba(0,0,0,0.2)"
                        border="2px dashed #f80"
                        borderRadius="md"
                        py={8}
                        px={4}
                        textAlign="center"
                        cursor="pointer"
                        height={'150px'}
                        _hover={{ bg: 'rgba(0,0,0,0.4)', color: 'white' }}
                      >
                        <Box
                          w={'full'}
                          h={'full'}
                          display={'flex'}
                          flexDir={'column'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <ImagePlusIcon size={'50px'} color="#f80" />
                          <Text mt={4}>Upload Image</Text>
                        </Box>
                        <Input
                          id="input"
                          name="imageUrl"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          display="none"
                        />
                      </FormLabel>
                    ) : (
                      <>
                        <Image
                          src={previewUrl}
                          alt="Uploaded Preview"
                          objectFit="contain"
                          borderRadius="md"
                          boxShadow="md"
                          w="100%"
                          h="150px"
                        />
                        <FormLabel
                          htmlFor="input"
                          position="absolute"
                          top="-12px"
                          right="-22px"
                          borderRadius="full"
                          p={2}
                          cursor="pointer"
                          boxShadow="sm"
                        >
                          <IconButton
                            as="span"
                            variant="solid"
                            borderRadius="full"
                            bg="gray.900"
                            color="white"
                            icon={<ImageUpscaleIcon size={'25px'} />}
                          />
                          <Input
                            id="input"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            display="none"
                          />
                        </FormLabel>
                      </>
                    )}
                  </Box>



                  {/* Name */}
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Field as={Input} name="name" placeholder="Enter name" />
                    {errors.name && touched.name && (
                      <Text color="red.400">{errors.name}</Text>
                    )}
                  </FormControl>

                  {/* Description */}
                  <FormControl
                    isRequired
                    isInvalid={errors.description && touched.description}
                  >
                    <FormLabel>Description</FormLabel>
                    <Field
                      as={Input}
                      name="description"
                      placeholder="Enter description"
                    />
                    <FormErrorMessage color="red.400">
                      {errors.description}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Price */}
                  <FormControl
                    isRequired
                    isInvalid={errors.price && touched.price}
                  >
                    <FormLabel>Price</FormLabel>
                    <Field
                      as={Input}
                      type="number"
                      name="price"
                      placeholder="e.g. 199"
                    />
                    <FormErrorMessage color="red.400">
                      {errors.price}
                    </FormErrorMessage>
                  </FormControl>
                  {/* discount */}
                  <FormControl
                    isRequired
                    isInvalid={errors.discount && touched.discount}
                  >
                    <FormLabel>Discount</FormLabel>
                    <Field
                      as={Input}
                      type="number"
                      name="discount"
                      placeholder="e.g. 29"
                    />
                    <FormErrorMessage color="red.400">
                      {errors.discount}
                    </FormErrorMessage>
                  </FormControl>
                  {/* lowStockThreshold */}
                  <FormControl
                    isRequired
                    isInvalid={
                      errors.lowStockThreshold && touched.lowStockThreshold
                    }
                  >
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <Field
                      as={Input}
                      type="number"
                      name="lowStockThreshold"
                      placeholder="e.g. 5"
                    />
                    <FormErrorMessage color="red.400">
                      {errors.lowStockThreshold}
                    </FormErrorMessage>
                  </FormControl>



                  {/* select category  */}
                  <FormControl
                    isRequired
                    isInvalid={errors.category && touched.category}
                  >
                    <FormLabel>Select Category Type</FormLabel>
                    <Field
                      as={Select}
                      value={values.category}
                      placeholder="Select Category"
                      onChange={(e) => setFieldValue("category", e.target.value)}
                      onBlur={handleBlur}
                    >
                      {categoryList?.map((category) => (
                        <option
                          key={category._id}
                          style={{ backgroundColor: "#111" }}
                          value={category._id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={errors.outlet && touched.outlet}
                  >
                    <FormLabel>Select Outlet</FormLabel>
                    <Field
                      as={Select}
                      value={values.outlet}
                      onChange={(e) => setFieldValue("outlet", e.target.value)}
                      placeholder="Select Outlet"
                      onBlur={handleBlur}
                    >
                      {outletList?.map((outlet) => (
                        <option
                          key={outlet._id}
                          style={{ backgroundColor: "#111" }}
                          value={outlet._id}
                        >
                          {outlet.name}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage>{errors.outlet}</FormErrorMessage>
                  </FormControl>
                  {/* Variations */}
                  <FieldArray name="variations">
                    {({ push, remove }) => (
                      <Box>
                        <Text fontWeight="400" fontSize={"md"} mb={2}>
                          Variations
                        </Text>

                        {values.variations.map((v, index) => (
                          <SimpleGrid
                            key={v.name}
                            columns={{ base: 1, md: 4 }}
                            spacing={2}
                            mb={4}
                          >
                            {/* Name */}
                            <FormControl isRequired aria-required="true">
                              <FormLabel>Name</FormLabel>
                              <Input
                                placeholder="Variation Name"
                                value={v.name}
                                onChange={(e) =>
                                  setFieldValue(
                                    `variations[${index}].name`,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>

                            {/* Price */}
                            <FormControl isRequired>
                              <FormLabel>Price</FormLabel>
                              <Input
                                placeholder="Price"
                                type="number"
                                value={v.price}
                                onChange={(e) =>
                                  setFieldValue(
                                    `variations[${index}].price`,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>

                            {/* Max Addons */}
                            <FormControl isRequired>
                              <FormLabel>Max Addons</FormLabel>
                              <Input
                                placeholder="Max Addons"
                                type="number"
                                value={v.maxAddons}
                                onChange={(e) =>
                                  setFieldValue(
                                    `variations[${index}].maxAddons`,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>

                            {/* Remove Button */}
                            <Box display="flex" alignItems="end">
                              <IconButton
                                variant="outline"
                                icon={<FaTrash />}
                                onClick={() => remove(index)}
                                aria-label="Remove Variation"
                              />
                            </Box>
                          </SimpleGrid>
                        ))}

                        <Button
                          variant="outline"
                          leftIcon={<FaPlus />}
                          onClick={() =>
                            push({ name: "", price: 0, maxAddons: 0 })
                          }
                        >
                          Add Variation
                        </Button>
                      </Box>
                    )}
                  </FieldArray>

                  {/* Addons */}
                  <FieldArray name="addons">
                    {({ push, remove }) => (
                      <Box>
                        <Text fontWeight="400" fontSize={"md"} mb={2}>
                          Addons
                        </Text>

                        {values.addons.map((a, index) => (
                          <SimpleGrid
                            key={index}
                            columns={{ base: 1, md: 4 }}
                            spacing={2}
                            mb={4}
                          >
                            {/* Name */}
                            <FormControl isRequired aria-required="true">
                              <FormLabel>Name</FormLabel>
                              <Input
                                required
                                placeholder="Addon Name"
                                value={a.name}
                                onChange={(e) =>
                                  setFieldValue(
                                    `addons[${index}].name`,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>

                            {/* Price */}
                            <FormControl isRequired>
                              <FormLabel>Price</FormLabel>
                              <Input
                                placeholder="Price"
                                type="number"
                                value={a.price}
                                onChange={(e) =>
                                  setFieldValue(
                                    `addons[${index}].price`,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>

                            {/* Type */}
                            <FormControl>
                              <FormLabel>Type</FormLabel>
                              <Select
                                value={a.type}
                                onChange={(e) =>
                                  setFieldValue(
                                    `addons[${index}].type`,
                                    e.target.value
                                  )
                                }
                              >
                                <option
                                  style={{ backgroundColor: "#111" }}
                                  value="TOPPING"
                                >
                                  TOPPING
                                </option>
                                <option
                                  style={{ backgroundColor: "#111" }}
                                  value="OPTION"
                                >
                                  OPTION
                                </option>
                                <option
                                  style={{ backgroundColor: "#111" }}
                                  value="SPICE"
                                >
                                  SPICE
                                </option>
                              </Select>
                            </FormControl>

                            {/* Remove Button */}
                            <Box display="flex" alignItems="end">
                              <IconButton
                                variant="outline"
                                icon={<FaTrash />}
                                onClick={() => remove(index)}
                                aria-label="Remove Addon"
                              />
                            </Box>
                          </SimpleGrid>
                        ))}

                        <Button
                          variant="outline"
                          leftIcon={<FaPlus />}
                          onClick={() =>
                            push({ name: "", price: 0, type: "TOPPING" })
                          }
                        >
                          Add Addon
                        </Button>
                      </Box>
                    )}
                  </FieldArray>
                  {/* Vegetarian */}
                  <FormControl>
                    <Checkbox
                      name="isVeg"
                      isChecked={values.isVeg}
                      onChange={(e) => setFieldValue("isVeg", e.target.checked)}
                    >
                      Vegetarian
                    </Checkbox>
                  </FormControl>

                </SimpleGrid>
              </CardBody>
              <CardFooter p={0} mb={{ sm: "4", md: 0 }} mt={6}>
                {/* Submit Button */}
                <HStack w="100%" justify="flex-end" gap={3}>
                  <Button
                    leftIcon={<FaBackspace />}
                    type="button"
                    size={{ base: "sm", md: "md" }}
                    variant="ghost"
                    onClick={() => resetForm()}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size={{ base: "sm", md: "md" }}
                    leftIcon={<LucideStepBack />}
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>

                  <Button
                    leftIcon={<PlusIcon />}
                    size={{ base: "sm", md: "md" }}
                    type="submit"
                    isLoading={itemId ? isUpdatingItem : isCreatingItem}
                    loadingText={itemId ? "Updating..." : "Creating..."}
                  >
                    {itemId ? "Update Item" : "Create Item"}
                  </Button>
                </HStack>
              </CardFooter>
            </Form>
          )
        }}
      </Formik>
    </Card>
  );
};

export default ItemForm;

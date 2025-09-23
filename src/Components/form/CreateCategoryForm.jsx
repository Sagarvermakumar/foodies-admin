import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { ImagePlusIcon, ImageUpscaleIcon, StarsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  createItemCategory,
  getItemCategory,
  updateCategory
} from '../../features/category/categoryAction'
import {
  MakeCategoryLoadingSelector,
  selectCategory,
} from '../../features/category/categorySelector'
import { CategoryValidationSchema } from '../../validation/category'
import Header from '../common/Heading'

// Validation schema

const CreateCategoryForm = () => {
  const categoryId = useParams().id
  const dispatch = useDispatch()

  const [previewUrl, setPreviewUrl] = useState(null)

  const category = useSelector(selectCategory)
  const isLoading = useSelector(MakeCategoryLoadingSelector('create'))
  const isLoadingCategory = useSelector(
    MakeCategoryLoadingSelector('getDetails')
  )

  useEffect(() => {
    if (categoryId && categoryId !== 'undefined' && categoryId !== 'null') {
      if (categoryId?.match(/^[0-9a-fA-F]{24}$/)) {
        dispatch(getItemCategory(categoryId))
      }
    } else {
      console.log('No valid categoryId provided, skipping fetch.')
    }
  }, [categoryId, dispatch])

  if (isLoadingCategory) {
    return <div> Loading Category... </div>
  }

  return (
    <Card bg={'transparent'} color={'gray.200'}>
      <CardHeader>
        <Header
          title={categoryId ? 'Update Category' : 'Create Category'}
          subtitle={categoryId ? 'Edit the category' : 'Create a new category'}
        />
      </CardHeader>
      <Formik
        enableReinitialize
        initialValues={{
          image: category ? category.imageUrl : '',
          name: category ? category.name : '',
          slug: category ? category.slug : '',
          description: category ? category.description : '',
          availableItems: category ? category.availableItems : 0,
          sortOrder: category ? category.sortOrder : 0,
          ratingCount: category ? category.ratingCount : 0,
          active: category ? category.active : true,
        }}
        validationSchema={CategoryValidationSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData()
          formData.append('image', values.image)
          formData.append('name', values.name)
          formData.append('slug', values.slug)
          formData.append('description', values.description)
          formData.append('availableItems', Number(values.availableItems))
          formData.append('sortOrder', Number(values.sortOrder))
          formData.append('ratingCount', Number(values.ratingCount))
          formData.append('active', values.active)

          // Handle form submission
          if (categoryId) {
            // Update category
            dispatch(updateCategory({ id: categoryId, data: formData }))
          } else {
            // Create category
            dispatch(createItemCategory(formData))
          }

          actions.setSubmitting(false)
          actions.resetForm()
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          resetForm,
        }) => {
          const handleChange = (e) => {
            const file = e.currentTarget.files[0]
            if (file) {
              setFieldValue('image', file) // formik state update
              setPreviewUrl(URL.createObjectURL(file)) // preview ke liye
            }
          }

          return (
            <Form>
              <CardBody>
                {/* image  */}
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
                        h="250px"
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
                          name="imageUrl"
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
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      mb={4}
                    >
                      <FormLabel>Category Name</FormLabel>
                      <Input {...field} placeholder="Enter category name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Slug */}
                <Field name="slug">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.slug && form.touched.slug}
                      mb={4}
                    >
                      <FormLabel>Slug</FormLabel>
                      <Input {...field} placeholder="category-slug" />
                      <FormErrorMessage>{form.errors.slug}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* description  */}
                <Field name="description">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.description && touched.description}
                      mb={4}
                    >
                      <FormLabel>Description</FormLabel>
                      <Input {...field} placeholder="Category description" />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* availableItems */}
                <Field name="availableItems">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.availableItems &&
                        form.touched.availableItems
                      }
                      mb={4}
                    >
                      <FormLabel>Available Items</FormLabel>
                      <NumberInput
                        min={0}
                        value={field.value}
                        onChange={(val) =>
                          form.setFieldValue('availableItems', val)
                        }
                      >
                        <NumberInputField {...field} />
                      </NumberInput>
                      <FormErrorMessage>
                        {form.errors.availableItems}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {/* // sort category in ui */}
                <Field name="sortOrder">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.sortOrder && form.touched.sortOrder
                      }
                      mb={4}
                    >
                      <FormLabel>Sort Order</FormLabel>
                      <NumberInput
                        typeof='number'
                        min={0}
                        value={field.value}
                        onChange={(val) => form.setFieldValue('sortOrder', val)}
                      >
                        <NumberInputField {...field} />
                      </NumberInput>
                      <FormErrorMessage>
                        {form.errors.sortOrder}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* // rating  */}

                <Field name="ratingCount">
                  {({ form }) => (
                    <FormControl mb={4}>
                      <FormLabel>Rating</FormLabel>
                      <HStack spacing={2}>
                        {[...Array(5)].map((_, index) => {
                          const starIndex = index + 1
                          return (
                            <IconButton
                              key={starIndex}
                              aria-label={`Rate ${starIndex}`}
                              icon={<StarsIcon />}
                              bg={
                                starIndex <= form.values.ratingCount
                                  ? 'transparent'
                                  : 'gray.300'
                              }
                              variant="outline"
                              onClick={() => setFieldValue('ratingCount', starIndex)}
                            />
                          )
                        })}
                      </HStack>
                    </FormControl>
                  )}
                </Field>

                {/* Active */}
                <Field name="active" type="checkbox">
                  {({ field }) => (
                    <FormControl display="flex" alignItems="center" mb={4}>
                      <FormLabel mb="0">Active</FormLabel>
                      <Switch
                        {...field}
                        isChecked={field.value}
                        colorScheme={'red'}
                      />
                    </FormControl>
                  )}
                </Field>
              </CardBody>
              <CardFooter>
                <HStack w="100%" justify="flex-end" gap={3}>
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => {
                      categoryId
                        ? toast.error(
                          "Can't reset form your're in editing mode "
                        )
                        : resetForm()
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="teal"
                    type="submit"
                    isLoading={isLoading}
                    loadingText={categoryId ? 'Updating...' : 'Creating...'}
                  >
                    {categoryId ? 'Update Outlet' : 'Create'}
                  </Button>
                </HStack>
              </CardFooter>
            </Form>
          )
        }}
      </Formik>
    </Card>
  )
}

export default CreateCategoryForm

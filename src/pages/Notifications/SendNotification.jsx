import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { pushNotification } from '../../features/notify/action'

const NotificationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  message: Yup.string().required('Message is required'),
  targetUsers: Yup.string().required('Please select target users'),
  type: Yup.string().required('Notification type is required'),
})

const Notification = () => {
  const dispatch = useDispatch()
  const handleSubmit = (values, actions) => {
    dispatch(pushNotification(values))
    actions.resetForm()
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="transparent"
      px={4}
    >
      <Box
        bg="transparent"
        p={8}
        rounded="2xl"
        shadow="dark-lg"
        w="full"
        maxW="lg"
      >
        <Heading mb={6} size="lg" textAlign="center" color="brand.900">
          Send Notification
        </Heading>

        <Formik
          initialValues={{
            title: '',
            message: '',
            targetUsers: 'ALL',
            type: 'info',
          }}
          validationSchema={NotificationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack spacing={5}>
                {/* Title */}
                <Field name="title">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter notification title"
                      />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Message */}
                <Field name="message">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.message && form.touched.message}
                    >
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Enter notification message"
                      />
                      <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Target Users */}
                <Field name="targetUsers">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.targetUsers && form.touched.targetUsers
                      }
                    >
                      <FormLabel>Target Users</FormLabel>
                      <Select {...field} value={form.targetUsers} >
                        {[
                          'ALL',
                          'SUPER_ADMIN',
                          'MANAGER',
                          'STAFF',
                          'DELIVERY',
                          'CUSTOMER',
                        ].map((target) => (
                          <option
                            style={{
                              backgroundColor: '#060707ff',
                              color: 'white',
                            }}
                            value={target}
                          >
                            {target}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.targetUsers}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Type */}
                <Field name="type">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.type && form.touched.type}
                    >
                      <FormLabel>Notification Type</FormLabel>
                      <Select {...field} value={form.type} >
                        {[
                          'info',
                          'warning',
                          'success',
                          'error',
                          'order',
                          'system',
                          'promo',
                        ].map((type) => (
                          <option
                            style={{
                              backgroundColor: '#060707ff',
                              color: 'white',
                            }}
                            value={type}
                          >
                            {type.toUpperCase()}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  colorScheme="teal"
                  w="full"
                  isLoading={isSubmitting}
                >
                  Send Notification
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Notification

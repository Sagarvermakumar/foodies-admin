import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { LoginSchema } from '../../../validation/auth'

function LoginForm({ loading, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Formik
      initialValues={{ emailOrPhone: '', password: '', role: 'SUPER_ADMIN' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values) // wait for handleLogin
        } catch (err) {
          console.error(err)
        } finally {
          actions.setSubmitting(false) // stop loading after login
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <VStack spacing={6} w="100%">
            {/* Email */}
            <Field name="emailOrPhone">
              {({ field }) => (
                <FormControl
                  isRequired
                  isInvalid={errors.emailOrPhone && touched.emailOrPhone}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    name='emailOrPhone'
                    id='emailOrPhone'

                    autoComplete="email"
                    placeholder="Email"
                    type="email"
                  />
                  <FormErrorMessage>{errors.emailOrPhone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* role  */}
            <Field name="role">
              {({ field }) => (
                <FormControl isRequired isInvalid={errors.role && touched.role}>
                  <FormLabel>Role</FormLabel>
                  <Select {...field} value={field.role}>
                    {['SUPER_ADMIN', 'MANAGER', 'STAFF', 'DELIVERY'].map(
                      (target) => (
                        <option
                          key={target}
                          style={{
                            backgroundColor: '#060707ff',
                            color: 'white',
                          }}
                          value={target}
                        >
                          {target}
                        </option>
                      )
                    )}
                  </Select>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Password */}
            <Field name="password">
              {({ field }) => (
                <FormControl
                  isRequired
                  isInvalid={errors.password && touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputRightAddon
                      onClick={() => setShowPassword((prev) => !prev)}
                      bg="gray.900"
                      _hover={{ bg: 'gray.800' }}
                      _active={{ bg: 'gray.800' }}
                      cursor="pointer"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              width="full"
              isLoading={loading || isSubmitting}
              boxShadow="md"
              mt={4}
              bg="brand.800"
              _hover={{
                bg: 'brand.700',
                boxShadow: '0 0 0 1px brand.500',
              }}
            >
              Login
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm

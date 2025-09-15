import { Formik, Form, Field } from "formik";

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ForgetPasswordSchema } from "../../../validation/auth";




export default function ForgetPasswordForm({ loading, onSubmit }) {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={(values, actions) => {
        onSubmit(values); 
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <VStack spacing={6}>
            {/* Email Field */}
            <Field name="email">
              {({ field }) => (
                <FormControl isRequired isInvalid={errors.email && touched.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...field}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    type="email"
                    color="white"
                    _focus={{
                      borderColor: "red.500",
                      borderWidth: "2px",
                      boxShadow: "0 0 0 1px red",
                      bg: "gray.900",
                    }}
                    _active={{
                      borderColor: "red.500",
                      boxShadow: "0 0 0 1px red.500",
                    }}
                    _focusVisible={{
                      borderColor: "red.500",
                      boxShadow: "0 0 0 1px red.500",
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              width="full"
              isLoading={loading || isSubmitting}
            >
              Send Reset Link
            </Button>
          </VStack>

          {/* Back to Login Link */}
          <Box
            textAlign="right"
            px={2}
            my={2}
            color="gray.500"
            textDecoration="underline"
            fontWeight="medium"
            _hover={{ textDecoration: "underline", color: "gray.400" }}
          >
            <Link to="/login">Back to Login</Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

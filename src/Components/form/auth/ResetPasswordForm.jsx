import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { ResetPasswordSchema } from "../../../validation/auth";

// ✅ Yup Validation Schema


const ResetPasswordForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
 <Formik
  initialValues={{
    password: "",
    confirmPassword: "",
  }}
  validationSchema={ResetPasswordSchema}
  onSubmit={(values, actions) => {
    onSubmit(values);
    actions.setSubmitting(false);
  }}
>
  {({ errors, touched, isSubmitting }) => (
    <Form>
      <VStack spacing={4} align="start" w="full">
        {/* New Password */}
        <Field name="password">
          {({ field }) => (
            <FormControl
              isRequired
              id="password"
              isInvalid={errors.password && touched.password}
            >
              <FormLabel>New Password</FormLabel>
              <Input
                {...field}   
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Confirm Password */}
        <Field name="confirmPassword">
          {({ field }) => (
            <FormControl
              isRequired
              id="confirmPassword"
              isInvalid={errors.confirmPassword && touched.confirmPassword}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Show Password Checkbox */}
        <Checkbox
          colorScheme="red"
          onChange={(e) => setShowPassword(e.target.checked)}
        >
          Show Password
        </Checkbox>

        <Button
          type="submit"
          mt={4}
          width="full"
          isLoading={loading || isSubmitting}
        >
          Reset Password
        </Button>
      </VStack>
    </Form>
  )}
</Formik>

  );
};

export default ResetPasswordForm;

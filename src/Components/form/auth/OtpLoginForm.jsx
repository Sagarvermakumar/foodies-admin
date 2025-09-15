import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useSelector } from 'react-redux';
import { selectOtpLoginLoading, selectVerifyOtpLoading } from "../../../features/auth/authSelector";
import { LoginWithOtpSchema } from "../../../validation/auth";
const OtpLoginForm = ({ onSubmitSendOTP, onSubmitVerifyOTP, otpSent }) => {

  const OtpLoginLoading = useSelector(selectOtpLoginLoading)
  const verifyOtpLoading = useSelector(selectVerifyOtpLoading)
  // Validation Schema


  // Fake handlers


  return (
    <Formik
      initialValues={{ emailOrPhone: "", otp: "" }}
      validationSchema={LoginWithOtpSchema}
      onSubmit={(values) => {
        if (!otpSent) {
          onSubmitSendOTP(values);
        } else {
          onSubmitVerifyOTP(values);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          {!otpSent ? (
            <FormControl
              id="emailOrPhone"
              isInvalid={errors.emailOrPhone && touched.emailOrPhone}
              isRequired
            >
              <FormLabel>Email or Phone</FormLabel>
              <Field
                as={Input}
                name="emailOrPhone"
                type="text"
                placeholder="admin@example.com or 9876543210"
              />
              {errors.emailOrPhone && touched.emailOrPhone && (
                <div style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.emailOrPhone}
                </div>
              )}

              <Button
                mt={4}
                colorScheme="red"
                variant={"solid"}
                type="submit"
                isLoading={OtpLoginLoading}
              >
                Send OTP
              </Button>
            </FormControl>
          ) : (
            <>
              <FormControl
                id="otp"
                isInvalid={errors.otp && touched.otp}
                isRequired
              >
                <FormLabel>Enter OTP</FormLabel>
                <HStack justify="center">
                  <PinInput
                    otp
                    type="number"
                    size="lg"
                    value={values.otp}
                    onChange={(val) => setFieldValue("otp", val)}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                {errors.otp && touched.otp && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.otp}
                  </div>
                )}
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"

                type="submit"
                isLoading={verifyOtpLoading}
              >
                Verify OTP & Login
              </Button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OtpLoginForm;

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { LucideStepBack } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCoupon,
  getCouponById,
  updateCoupon,
} from "../../features/coupon/couponAction";
import {
  MakeCouponLoadingSelector,
  selectCurrentCoupon,
} from "../../features/coupon/couponSelector";
import { formatDateTimeLocal } from "../../utils/formatDateTimeLocal";
import { CouponSchema } from "../../validation/coupon";
import Header from "../common/Heading";

const CreateCouponForm = () => {
  const couponId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const currentCoupon = useSelector(selectCurrentCoupon);
  const isLoadingCurrentCoupon = useSelector(
    MakeCouponLoadingSelector("getById")
  );
  const isCreatingCoupon = useSelector(MakeCouponLoadingSelector("create"));
  const isUpdatingCoupon = useSelector(MakeCouponLoadingSelector("update"));

  useEffect(() => {
    const isValidId = couponId && /^[0-9a-fA-F]{24}$/.test(couponId);
    if (isValidId) {
      dispatch(getCouponById(couponId));
    } else {
      console.warn("Invalid couponId, skipping fetch");
    }
  }, [couponId, dispatch]);

  if (isLoadingCurrentCoupon) {
    return <Text>Loading Coupon Details...</Text>;
  }

  if (couponId && !currentCoupon) {
    return <Text>Invalid Coupon ID : {couponId}</Text>;
  }

  return (
    <Card bg="transparent" color={"gray.200"} >
      <Formik
        initialValues={{
          code: currentCoupon?.code || "",
          title: currentCoupon?.title || "",
          description: currentCoupon?.description || "",
          type: currentCoupon?.type || "PERCENT",
          value: currentCoupon?.value || 0,
          minOrder: currentCoupon?.minOrder || 0,
          maxDiscount: currentCoupon?.maxDiscount || 0,
          startAt: formatDateTimeLocal(currentCoupon?.startAt) || "",
          endAt: formatDateTimeLocal(currentCoupon?.endAt) || "",
          usageLimit: currentCoupon?.usageLimit || 1,
          perUserLimit: currentCoupon?.perUserLimit || 1,
        }}
        validationSchema={CouponSchema}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (couponId) {
            await dispatch(updateCoupon({ couponId, ...values })).unwrap()
            navigate('/coupon')
          } else {
            await dispatch(createCoupon(values)).unwrap()
            navigate('/coupon')
          }
          actions.setSubmitting(false);
          actions.resetForm()
        }}
      >
        {({ values, handleChange, errors, touched, resetForm }) => {
          return (
            <Form>
              <CardHeader p={0} m={0}>
                <Header
                  title={couponId ? "Edit Coupon" : "Add New Coupon"}
                  subtitle={
                    couponId
                      ? "Edit the details of the coupon"
                      : "Fill the form to create a new coupon"
                  }
                />
              </CardHeader>
              <CardBody p={0} m={0}>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={4}
                  align="stretch"
                >
                  <FormControl
                    isRequired
                    isInvalid={!!errors.code && touched.code}
                  >
                    <FormLabel>Coupon Code</FormLabel>
                    <Input
                      placeholder="e.g. SUMMER21"
                      type="text"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                    />

                    <FormErrorMessage>{errors.code}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.title && touched.title}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      type="text"
                      placeholder="e.g. Summer Sale"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select
                      placeholder="Select coupon type"
                      _placeholder={{ color: "gray.900" }}
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <option
                        value="PERCENT"
                        style={{ backgroundColor: "#4a28b1ff" }}
                      >
                        Percent
                      </option>
                      <option
                        value="FLAT"
                        style={{ backgroundColor: "#4a28b1ff" }}
                      >
                        Flat
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.value && touched.value}
                  >
                    <FormLabel>Value</FormLabel>
                    <Input
                      type="number"
                      placeholder="e.g. 10"
                      name="value"
                      value={Number(values.value) || 0}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.value}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.minOrder && touched.minOrder}
                  >
                    <FormLabel>Minimum Order</FormLabel>
                    <Input
                      type="number"
                      placeholder="e.g. 100"
                      name="minOrder"
                      value={Number(values.minOrder) || 0}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.minOrder}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.maxDiscount && touched.maxDiscount}
                  >
                    <FormLabel>Max Discount</FormLabel>
                    <Input
                      type="number"
                      placeholder="e.g. 50"
                      name="maxDiscount"
                      value={Number(values.maxDiscount) || 0}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors?.maxDiscount}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.startAt && touched.startAt}
                  >
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="datetime-local"
                      name="startAt"
                      value={values.startAt}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.startAt}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.endAt && touched.endAt}
                  >
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="datetime-local"
                      name="endAt"
                      value={values.endAt}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.endAt}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.usageLimit && touched.usageLimit}
                  >
                    <FormLabel>Usage Limit</FormLabel>
                    <Input
                      type="number"
                      placeholder="e.g. 100"
                      name="usageLimit"
                      value={Number(values.usageLimit) || 0}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.usageLimit}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={!!errors.perUserLimit && touched.perUserLimit}
                  >
                    <FormLabel>Per User Limit</FormLabel>
                    <Input
                      type="number"
                      placeholder="e.g. 100"
                      name="perUserLimit"
                      value={Number(values.perUserLimit) || 0}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.perUserLimit}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
                <FormControl
                  isRequired
                  isInvalid={!!errors.description && touched.description}
                >
                  <FormLabel mt={4}>Description</FormLabel>
                  <Textarea
                    placeholder="e.g. Get 20% off on all orders above $50"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
              </CardBody>
              <CardFooter>
                <HStack w="100%" justify="flex-end" gap={3}>
                  <Button
                    type="reset"
                    w={{ sm: "full", md: "auto" }}
                    variant="outline"
                    onClick={() => {
                      if (couponId && currentCoupon) {
                        toast.error("Can't Reset form, Editing mode is active");
                      } else {
                        resetForm();
                      }
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<LucideStepBack />}
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={couponId ? isUpdatingCoupon : isCreatingCoupon}
                    loadingText={couponId ? "Updating..." : "Creating..."}
                    w={{ sm: "full", md: "auto" }}
                    variant={couponId ? "solid" : "outline"}
                  >
                    {couponId ? "Update Coupon" : "Create Coupon"}
                  </Button>
                </HStack>
              </CardFooter>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default CreateCouponForm;

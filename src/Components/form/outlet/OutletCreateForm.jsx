import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import { Field, Form, Formik, getIn } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOutletDetails } from "../../../features/outlet/action";
import { selectOutletDetails, selectOutletLoading } from "../../../features/outlet/selector";
import { setOutletDetails } from "../../../features/outlet/slice";
import { useGeolocation } from "../../../hook/useGeolocation";
import { OutLetValidationSchema } from "../../../validation/outlet";
import Header from "../../common/Heading";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const OutletCreateForm = ({ onSubmitCreate, onSubmitUpdate }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let outletDetails = useSelector(selectOutletDetails);
  const isLoading = useSelector(selectOutletLoading(id ? "updateOne" : "createNew"));
  const isDetailsLoading = useSelector(selectOutletLoading("getDetails"));

  const { coordinates, error: geoLocationError } = useGeolocation();

  console.log("Outlet cord : ", coordinates)
  console.log("Outlet cord geoLocationError : ", geoLocationError)

  useEffect(() => {
    if (id) {
      dispatch(getOutletDetails(id));
    }

    return () => dispatch(setOutletDetails());
  }, [id, dispatch]);

  const initialValues = {
    name: outletDetails?.name || "",
    code: outletDetails?.code || "",
    phone: outletDetails?.phone || "",
    openingHours: outletDetails?.openingHours || {
      open: "09:00",
      close: "22:00",
      weeklyOff: [0],
    },
    deliveryCharges: outletDetails?.deliveryCharges || "FIXED",
    deliveryConfig: outletDetails?.deliveryConfig || {
      fixed: 0,
      perKm: 0,
      freeAbove: 0,
    },
    gstIN: outletDetails?.gstIN || "",
    active: outletDetails?.active || true,
    address: outletDetails?.address || {
      label: "Work",
      addressLine: "",
      location: { type: "Point", coordinates: coordinates }, // [lng, lat]
      isDefaultAddress: true,
    },
  };




  if (isDetailsLoading) {
    return <div>Loading outlet details...</div>;
  }

  if (id && !outletDetails) {
    return <Text>Invalid Outlet ID : {id}</Text>;
  }

  return (
    <Card bg={"transparent"} color={"gray.300"}>
      <CardHeader p={0} m={0}>
        <Header
          title={id ? "Edit Outlet" : "Add New Outlet"}
          subtitle={id ? "Update outlet details" : "Create a new outlet"}
        />
      </CardHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={OutLetValidationSchema}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (id) {
            onSubmitUpdate(id, values, actions);
          } else {
            onSubmitCreate(values, actions);
          }
        }}
      >
        {({ resetForm, values, errors, touched }) => {
          const err = getIn(errors, "openingHours.weeklyOff");
          const tch = getIn(touched, "openingHours.weeklyOff");

          return (
            <Form>
              <CardBody p={0} mt={0}>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                >
                  {/* Name */}
                  <GridItem>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} placeholder="Outlet name" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>

                  {/* Code */}
                  <GridItem>
                    <Field name="code">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.code && form.touched.code}
                          isRequired
                        >
                          <FormLabel>Code</FormLabel>
                          <Input
                            {...field}
                            placeholder="E.g. NOIDA-1"
                            onChange={(e) =>
                              form.setFieldValue(
                                "code",
                                e.target.value.toUpperCase()
                              )
                            }
                          />
                          <FormErrorMessage>
                            {form.errors.code}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>

                  {/* Phone */}
                  <GridItem>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                          isRequired
                        >
                          <FormLabel>Phone</FormLabel>
                          <Input {...field} placeholder="e.g. 9876543210" />
                          <FormErrorMessage>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>

                  {/* GSTIN */}
                  <GridItem>
                    <Field name="gstIN">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.gstIN && form.touched.gstIN}
                          isRequired
                        >
                          <FormLabel>GSTIN</FormLabel>
                          <Input
                            {...field}
                            placeholder="15-char GSTIN"
                            onChange={(e) =>
                              form.setFieldValue(
                                "gstIN",
                                e.target.value.toUpperCase()
                              )
                            }
                          />
                          <FormErrorMessage>
                            {form.errors.gstIN}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>

                  {/* Opening Hours  : Open, Close, weeklyOff*/}
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={4}
                    >
                      <Field name="openingHours.open">
                        {({ field, form }) => (
                          <FormControl
                            flex={0.5}
                            isInvalid={
                              form.errors.openingHours?.open &&
                              form.touched.openingHours?.open
                            }
                            isRequired
                          >
                            <FormLabel>Opens At</FormLabel>
                            <Input {...field} type="time" />
                            <FormErrorMessage>
                              {form.errors.openingHours?.open}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="openingHours.close">
                        {({ field, form }) => (
                          <FormControl
                            flex={0.46}
                            isInvalid={
                              form.errors.openingHours?.close &&
                              form.touched.openingHours?.close
                            }
                            isRequired
                          >
                            <FormLabel>Closes At</FormLabel>
                            <Input {...field} type="time" />
                            <FormErrorMessage>
                              {form.errors.openingHours?.close}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <FormControl flex={1} isInvalid={!!err && !!tch}>
                        <FormLabel pl={{ base: 0, md: 2 }}>
                          Weekly Off
                        </FormLabel>
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          spacing={6}
                          pl={{ base: 0, md: 2 }}
                        >
                          {weekDays.map((day, index) => (
                            <Field key={index} name="openingHours.weeklyOff">
                              {({ form }) => (
                                <Checkbox
                                  value={index}
                                  isChecked={form.values.openingHours.weeklyOff.includes(
                                    index
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      form.setFieldValue(
                                        "openingHours.weeklyOff",
                                        [
                                          ...form.values.openingHours.weeklyOff,
                                          index,
                                        ]
                                      );
                                    } else {
                                      form.setFieldValue(
                                        "openingHours.weeklyOff",
                                        form.values.openingHours.weeklyOff.filter(
                                          (v) => v !== index
                                        )
                                      );
                                    }
                                  }}
                                >
                                  {day}
                                </Checkbox>
                              )}
                            </Field>
                          ))}
                        </Stack>
                        <FormErrorMessage>{err}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </GridItem>

                  {/* Delivery Charges */}
                  <GridItem>
                    <Field name="deliveryCharges">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.deliveryCharges &&
                            form.touched.deliveryCharges
                          }
                          isRequired
                        >
                          <FormLabel>Delivery Charges Type</FormLabel>
                          <Select
                            {...field}
                            onChange={(e) =>
                              form.setFieldValue(
                                "deliveryCharges",
                                e.target.value
                              )
                            }
                          >
                            <option value="FIXED">FIXED</option>
                            <option value="PER_KM">PER_KM</option>
                            <option value="FREE_ABOVE">FREE_ABOVE</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.deliveryCharges}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>

                  {values.deliveryCharges === "FIXED" && (
                    <GridItem>
                      <Field name="deliveryConfig.fixed">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.deliveryConfig?.fixed &&
                              form.touched.deliveryConfig?.fixed
                            }
                            isRequired
                          >
                            <FormLabel>Fixed Delivery Charge (₹)</FormLabel>
                            <NumberInput
                              min={0}
                              precision={2}
                              value={field.value || ""}
                              onChange={(val) =>
                                form.setFieldValue("deliveryConfig.fixed", val)
                              }
                            >
                              <NumberInputField placeholder="Enter fixed charge" />
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.deliveryConfig?.fixed}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  )}

                  {values.deliveryCharges === "PER_KM" && (
                    <GridItem>
                      <Field name="deliveryConfig.perKm">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.deliveryConfig?.perKm &&
                              form.touched.deliveryConfig?.perKm
                            }
                            isRequired
                          >
                            <FormLabel>Per Km Delivery Charge (₹)</FormLabel>
                            <NumberInput
                              min={0}
                              precision={2}
                              value={field.value}
                              onChange={(val) =>
                                form.setFieldValue("deliveryConfig.perKm", val)
                              }
                            >
                              <NumberInputField placeholder="Enter per km charge" />
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.deliveryConfig?.perKm}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  )}

                  {values.deliveryCharges === "FREE_ABOVE" && (
                    <GridItem>
                      <Field name="deliveryConfig.freeAbove">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.deliveryConfig?.freeAbove &&
                              form.touched.deliveryConfig?.freeAbove
                            }
                            isRequired
                          >
                            <FormLabel>Free Delivery Above (₹)</FormLabel>
                            <NumberInput
                              min={0}
                              precision={2}
                              value={field.value || ""}
                              onChange={(val) =>
                                form.setFieldValue(
                                  "deliveryConfig.freeAbove",
                                  val
                                )
                              }
                            >
                              <NumberInputField placeholder="Enter amount" />
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.deliveryConfig?.freeAbove}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  )}

                  {/* Address */}
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <Heading size="sm" mb={2}>
                      Address
                    </Heading>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={6}
                    >
                      <GridItem>
                        <Field name="address.label">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.address?.label &&
                                form.touched.address?.label
                              }
                              isRequired
                            >
                              <FormLabel>Label</FormLabel>
                              <Input {...field} placeholder="Home / Work" />
                              <FormErrorMessage>
                                {form.errors.address?.label}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </GridItem>

                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Field name="address.addressLine">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.address?.addressLine &&
                                form.touched.address?.addressLine
                              }
                              isRequired
                            >
                              <FormLabel>Address Line</FormLabel>
                              <Input
                                {...field}
                                placeholder="221B Baker Street, London"
                              />
                              <FormErrorMessage>
                                {form.errors.address?.addressLine}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </GridItem>

                      <GridItem>
                        <Field name="address.location.coordinates[0]">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.address?.location?.coordinates &&
                                form.touched.address?.location?.coordinates
                              }
                              isRequired
                            >
                              <FormLabel>Longitude</FormLabel>
                              <Input
                                {...field}
                                placeholder="Longitude"
                                type="number"
                                disabled={geoLocationError === null}
                              />
                              <FormErrorMessage>
                                {form.errors.address?.location?.coordinates}
                              </FormErrorMessage>
                              {<Text>{geoLocationError}</Text>}

                            </FormControl>
                          )}
                        </Field>
                      </GridItem>

                      <GridItem>
                        <Field name="address.location.coordinates[1]">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.address?.location?.coordinates &&
                                form.touched.address?.location?.coordinates
                              }
                              isRequired
                              disabled={err}
                            >
                              <FormLabel>Latitude</FormLabel>
                              <Input
                                {...field}
                                placeholder="Latitude"
                                type="number"
                                disabled={geoLocationError === null ? true : false}
                              />
                              <FormErrorMessage>
                                {form.errors.address?.location?.coordinates}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <Field name="address.isDefaultAddress">
                          {({ field, form }) => (
                            <Checkbox
                              isChecked={field.value}
                              onChange={(e) =>
                                form.setFieldValue(
                                  "address.isDefaultAddress",
                                  e.target.checked
                                )
                              }
                            >
                              Default Address
                            </Checkbox>
                          )}
                        </Field>
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
              </CardBody>

              <Divider />
              <CardFooter>
                <HStack w="100%" justify="flex-end" gap={3}>
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => resetForm()}
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
                    loadingText={id ? "Updating..." : "Creating..."}
                  >
                    {id ? "Update Outlet" : "Create Outlet"}
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

export default OutletCreateForm;

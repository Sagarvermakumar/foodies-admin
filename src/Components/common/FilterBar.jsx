import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Calendar } from "lucide-react";
import * as Yup from "yup";
import { ORDER_STATUS } from "../../assets/assets";

// ✅ Validation schema with Yup
const FilterSchema = Yup.object().shape({
  search: Yup.string()
    .min(2, "Enter at least 2 characters")
    .max(50, "Too long"),
  date: Yup.date().nullable().typeError("Invalid date format"),
});

const FilterBar = ({ onFilter, today }) => {
  return (
    <Formik
      initialValues={{
        search: "",
        status: "",
        date: today,
      }}
      validationSchema={FilterSchema}
      onSubmit={(values) => {
        console.log("Filter applied:", values);
        if (onFilter) onFilter(values);
      }}
    >
      {({ errors, touched, resetForm }) => (
        <Form>
          <HStack spacing={4} mb={4} align="flex-start" flexWrap="wrap" w={'full'} >
            {/* 🔍 Search Input */}
            {/* <FormControl
              maxW={{ sm: "ful", md: "200px" }}
              isInvalid={errors.search && touched.search}
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search pl={4} size={16} />
                </InputLeftElement>
                <Field
                  as={Input}
                  w="100%"
                  name="search"
                  placeholder="Search by name/email"
                  pl={"32px"}
                />
              </InputGroup>
              <FormErrorMessage>{errors.search}</FormErrorMessage>
            </FormControl> */}

            {/* ⏳ Status Dropdown */}
            <FormControl
              maxW={{ sm: "ful", md: "200px" }}
              isInvalid={errors.status && touched.status}
            >
              <InputGroup>
                <Field
                  as={Select}
                  placeholder={"All"}

                  name="status"
                >
                  {ORDER_STATUS.map((ord) => (
                    <option
                      style={{ backgroundColor: "#1a202c", color: "white" }}
                      value={ord}
                      key={ord}
                    >
                      {ord}
                    </option>
                  ))}
                </Field>
              </InputGroup>
              <FormErrorMessage>{errors.status}</FormErrorMessage>
            </FormControl>

            {/* 📅 Date Picker */}
            <FormControl maxW={{ sm: "ful", md: "200px" }} isInvalid={errors.date && touched.date}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Calendar size={16} />
                </InputLeftElement>
                <Field
                  as={Input}
                  type="date"
                  name="date"
                  pl={"32px"}

                />
              </InputGroup>
              <FormErrorMessage>{errors.date}</FormErrorMessage>
            </FormControl>

            {/* Apply Button */}
            <Button variant={'solid'} type="submit" minW={"200px"}>
              Apply Filters
            </Button>
            <Button
              variant={"outline"}
              minW={"200px"}
              onClick={() => resetForm()}
            >
              Clear Filters
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBar;

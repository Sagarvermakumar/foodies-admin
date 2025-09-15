import { Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => {
  return (
    <Flex flexDir="column" my={4}>
      <Heading
        size="md"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="600"
        fontFamily={'inherit'}
        // color="whiteAlpha.100"
        letterSpacing="wider"
        lineHeight="shorter"
        bgGradient="linear(to-r,  #f80,  #ff0080, #ff0080)"
        bgClip="text"

      >
        {title}
      </Heading>

      {subtitle && (
        <Text
          color="gray.300"
          fontSize={{ base: "sm", md: "md" }}
          mt={1}
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Header;

"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { sidebarMenus } from "../../assets/assets";
import { selectAuthUser } from "../../features/auth/authSelector";

// Sidebar Main Component
export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="transparent" minW="full" pos={"relative"}>

      {/* Fixed Sidebar for Desktop */}
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

      {/* Drawer Sidebar for Mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerContent
          bg="transparent"
          // backdropFilter="blur(8px) hue-rotate(10deg)"
          pb={4}
        >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Mobile Nav */}
      <MobileNav onOpen={onOpen} display={{ base: "flex", md: "none" }} />

      {/* Main Content */}
      <Box flex="1" height="100%" ml={{ base: 0, md: 72 }}>
        {children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

// SidebarContent with Fixed Position
const SidebarContent = ({ onClose, ...rest }) => {
  const user = useSelector(selectAuthUser);
  const role = user?.role;

  const filteredLinks = sidebarMenus
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => link.roles.includes(role)),
    }))
    .filter((section) => section.links.length > 0);

  const location = useLocation();
  const activeIndex = filteredLinks.findIndex((section) =>
    section.links.some(
      (link) =>
        matchPath({ path: link.path, end: true }, location.pathname) !== null
    )
  );
  const defaultIndexes = [0, 1];
  if (activeIndex !== -1 && !defaultIndexes.includes(activeIndex)) {
    defaultIndexes.push(activeIndex);
  }
  return (
    <Box
      bg="transparent"
      borderRight="1px"
      borderRightColor="gray.900"
      boxShadow={'md'}
      backdropFilter="blur(80px) hue-rotate(0deg)"
      w={{ base: "full", md: 72 }}
      pos="fixed"
      left="0"
      top="0"
      h="100vh"
      zIndex="1000"
      display="flex"
      flexDirection="column"
      {...rest}
    >
      {/* Close button for mobile */}
      <Flex
        height={{ sm: "20", md: "0" }}
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          bg="red"
          boxShadow="1px 1px 20px 10px rgba(246, 237, 237, 0.1)"
        />
      </Flex>

      {/* Scrollable Area */}
      <Box flex="1" h="100vh" overflowY="auto" px="2" className="sidebar">
        <Accordion allowMultiple defaultIndex={defaultIndexes}>
          {filteredLinks.map((section) => (
            <AccordionItem key={section.section} border="none">
              <h2>
                <AccordionButton
                  defaultChecked
                  px="4"
                  py="2"
                  fontSize="md"
                  fontWeight="bold"
                  color="gray.400"
                  _hover={{ bg: "rgba(255,255,255,0.05)", color: "#f50" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {section.section}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2} pl="2">
                {section.links.map((link) => (
                  <NavItem
                    key={link.name}
                    icon={link.icon}
                    path={link.path}
                    isActive={location.pathname === link.path}
                    onClick={onClose}
                  >
                    {link.name}
                  </NavItem>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

//Sidebar Link Items
const NavItem = ({ icon, children, path, isActive, pl = "4", ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="3"
        pl={pl}
        mx="4"
        my={2}
        fontFamily="monospace"
        fontWeight={isActive ? "extrabold" : "normal"}
        fontSize="md"
        borderRadius="md"
        boxShadow={'dark-lg'}
        color={isActive ? "#f62" : "gray.100"}
        _hover={{
          color: "#f80",
          bg: "rgba(0,0,0,0.4)",
          fontWeight: 700,
        }}
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="3" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

NavItem.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  pl: PropTypes.any,
};

// ✅ Mobile Navigation Bar
const MobileNav = ({ onOpen, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Flex
      ml={{ base: 0, md: 72 }}
      px={{ base: 4, md: 6 }}
      height="20"
      alignItems="center"
      bg="transparent"
      // borderBottomWidth="1px"
      // borderBottomColor="gray.700"
      boxShadow={'dark-lg'}
      justifyContent="space-between"
      w="100%"
      {...rest}
    >
      <IconButton
        variant="ghost"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        _hover={{ bg: "rgba(0,0,0,0.2)" }}
      />
      <Avatar src={user?.avatar || ""} name={user?.name || ""} />
    </Flex>
  );
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

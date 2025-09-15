import { Box, Button, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdAddBusiness } from 'react-icons/md'
import { Link } from 'react-router-dom'

const CreateNew = ({label,
  redirectUrl = "/",
  subLabel,
  btnLabel = "Go Back",
  Icon = MdAddBusiness}) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="xl"
            shadow="md"
            p={5}
            bg="whiteAlpha.50"
            minW={'350px'}
        maxW={'450px'}
        >
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"full"}
                flexDir={"column"}
            >
                {Icon && <Icon size={"65px"} />}
                <Text pt={8} fontSize={"3xl"} color={"#f80"}>
                   {label}
                </Text>
                <Text fontSize="md" color="gray.500" textAlign={"center"} mt={2}>
                   {subLabel}  
                </Text>
                <Link to={redirectUrl} >
                <Button mt={6} variant={'outline'} bg={'transparent'} leftIcon={<Icon />}>
                  {btnLabel}
                </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default CreateNew
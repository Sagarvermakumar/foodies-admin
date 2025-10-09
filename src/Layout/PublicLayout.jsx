import { Box, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import GlassLayout from './GlassLayout.jsx'

const MotionBox = motion(Box)

const PublicLayout = () => {
  const { colorMode } = useColorMode()
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={-1}
        bg={colorMode === 'dark' ? '#00000093' : '#fff'}
      >
        <GlassLayout />
      </Box>
      <Navbar />
      <Box flex="1" as="main">
        <Outlet />
      </Box>
      <Footer />
    </MotionBox>
  )
}

export default PublicLayout

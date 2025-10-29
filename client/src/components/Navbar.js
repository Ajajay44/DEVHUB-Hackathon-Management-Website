// client/src/components/Navbar.js
import { Box, Flex, Heading, Button, Link as ChakraLink, HStack } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function Navbar() {
  // 1. Get auth state and functions from the context
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // 2. Define the logout handler
  const handleLogout = () => {
    logout(); // Calls the logout function from AuthContext
    navigate('/login'); // Redirects the user to the login page
  };

  const location = useLocation();

  // 3. Return the JSX for the Navbar
  return (
    <MotionBox
      className="glass"
      position="sticky"
      top="0"
      zIndex="1000"
      p={4}
      borderBottom="1px solid"
      borderColor="dark.border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        {/* Logo/Brand as a link to the Home page */}
        <Heading
          as={ReactRouterLink}
          to="/"
          size="lg"
          className="gradient-text"
          fontWeight="bold"
          letterSpacing="tight"
          _hover={{ transform: 'scale(1.05)' }}
          transition="transform 0.2s"
        >
          ⚡ DEVHUB
        </Heading>

        {/* Links section */}
        <HStack spacing={6}>
          {/* 4. Use a ternary operator to show different links */}
          {isAuthenticated ? (
            <>
              <ChakraLink
                as={ReactRouterLink}
                to="/dashboard"
                color={location.pathname === '/dashboard' ? 'neon.cyan' : 'gray.300'}
                fontWeight={location.pathname === '/dashboard' ? 'semibold' : 'normal'}
                _hover={{ color: 'neon.cyan' }}
                transition="all 0.2s"
              >
                Dashboard
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/team"
                color={location.pathname === '/team' ? 'neon.cyan' : 'gray.300'}
                fontWeight={location.pathname === '/team' ? 'semibold' : 'normal'}
                _hover={{ color: 'neon.cyan' }}
                transition="all 0.2s"
              >
                My Team
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/project"
                color={location.pathname === '/project' ? 'neon.cyan' : 'gray.300'}
                fontWeight={location.pathname === '/project' ? 'semibold' : 'normal'}
                _hover={{ color: 'neon.cyan' }}
                transition="all 0.2s"
              >
                Submit Project
              </ChakraLink>
              {user?.role === 'admin' && (
                <ChakraLink
                  as={ReactRouterLink}
                  to="/admin"
                  color={location.pathname === '/admin' ? 'neon.purple' : 'gray.300'}
                  fontWeight={location.pathname === '/admin' ? 'semibold' : 'normal'}
                  _hover={{ color: 'neon.purple' }}
                  transition="all 0.2s"
                >
                  Admin
                </ChakraLink>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                borderColor="neon.cyan"
                color="neon.cyan"
                _hover={{
                  bg: 'rgba(0, 217, 255, 0.1)',
                  transform: 'translateY(-2px)',
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <ChakraLink
                as={ReactRouterLink}
                to="/login"
                color="gray.300"
                _hover={{ color: 'neon.cyan' }}
                transition="all 0.2s"
              >
                Login
              </ChakraLink>
              <Button
                as={ReactRouterLink}
                to="/register"
                size="sm"
                bg="neon.cyan"
                color="dark.bg"
                _hover={{
                  bg: 'neon.blue',
                  transform: 'translateY(-2px)',
                }}
              >
                Register
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </MotionBox>
  );
}

export default Navbar;
// client/src/pages/LoginPage.js
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Container,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import useCustomToast from '../hooks/useCustomToast';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { motion } from 'framer-motion';
import HexagonGrid from '../components/HexagonGrid';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);

function LoginPage() {
  const [email, setEmail] = useState(''); // 2. Simplified state
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // 3. Get the login function from context
  const navigate = useNavigate();
  const toast = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 4. Call the context login function
      const { success, message } = await login(email, password);

      if (success) {
        // The success toast is now handled in the AuthContext
        navigate('/dashboard'); // Redirect to dashboard
      }
      // Error toast is handled in the AuthContext
    } catch (err) {
      // This catch block is for unexpected errors
      console.error(err);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Box position="relative" minH="100vh" display="flex" alignItems="center">
      <HexagonGrid />
      <Container maxW="md" py={20}>
        <MotionBox
          className="glass-strong"
          p={10}
          borderRadius="2xl"
          boxShadow="0 8px 32px 0 rgba(0, 217, 255, 0.2)"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack as="form" onSubmit={handleSubmit} spacing={6}>
            <Heading
              mb={2}
              fontSize="3xl"
              className="gradient-text"
              textAlign="center"
            >
              Welcome Back
            </Heading>
            <Text color="gray.400" textAlign="center" mb={4}>
              Sign in to continue your hackathon journey
            </Text>
            <FormControl isRequired>
              <FormLabel color="gray.300">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                _focus={{
                  borderColor: 'neon.cyan',
                  boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                _focus={{
                  borderColor: 'neon.cyan',
                  boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                }}
              />
            </FormControl>

            <AnimatedButton
              type="submit"
              width="full"
              size="lg"
              mt={4}
              bg="neon.cyan"
              color="dark.bg"
              _hover={{
                bg: 'neon.blue',
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
              }}
            >
              Sign In
            </AnimatedButton>

            <Text color="gray.400" textAlign="center" mt={4}>
              Don't have an account?{' '}
              <ChakraLink
                as={ReactRouterLink}
                to="/register"
                color="neon.cyan"
                fontWeight="semibold"
                _hover={{ textDecoration: 'underline' }}
              >
                Register here
              </ChakraLink>
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default LoginPage;
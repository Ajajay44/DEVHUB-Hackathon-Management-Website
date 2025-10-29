// client/src/pages/RegisterPage.js
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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HexagonGrid from '../components/HexagonGrid';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://devhub-hackathon-management-website.onrender.com/api/auth/register',
        formData
      );
      toast({
        title: 'Registration Successful!',
        description: 'Please login to continue.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (err) {
      toast({
        title: 'Registration Failed',
        description: err.response?.data?.msg || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
              Join the Hackathon
            </Heading>
            <Text color="gray.400" textAlign="center" mb={4}>
              Create your account and start building
            </Text>
            <FormControl isRequired>
              <FormLabel color="gray.300">Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                size="lg"
                _focus={{
                  borderColor: 'neon.cyan',
                  boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                onChange={handleChange}
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
                onChange={handleChange}
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
              Create Account
            </AnimatedButton>

            <Text color="gray.400" textAlign="center" mt={4}>
              Already have an account?{' '}
              <ChakraLink
                as={ReactRouterLink}
                to="/login"
                color="neon.cyan"
                fontWeight="semibold"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign in here
              </ChakraLink>
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default RegisterPage;
// client/src/pages/ProjectPage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Spinner,
  Center,
  Container,
  Text,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import GlowingCard from '../components/GlowingCard';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);

function ProjectPage() {
  const { user } = useAuth(); // Get auth context
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    demoLink: '',
  });
  const [loading, setLoading] = useState(true);
  const [hasTeam, setHasTeam] = useState(true); // Assume they have a team
  const toast = useToast();

  // De-structure for easier use in the form
  const { title, description, githubLink, demoLink } = formData;

  // 1. Fetch existing project data when page loads
  useEffect(() => {
    const fetchProject = async () => {
      // First, check if the user is on a team
      if (!user.team) {
        setHasTeam(false);
        setLoading(false);
        return;
      }
      // If on a team, try to get their project
      try {
  const res = await axios.get('https://devhub-hackathon-management-website.onrender.com/api/projects/my-project');
        // If a project exists, pre-fill the form
        setFormData({
          title: res.data.title,
          description: res.data.description,
          githubLink: res.data.githubLink || '',
          demoLink: res.data.demoLink || '',
        });
      } catch (err) {
        // A 404 is fine, it just means no project submitted yet
        if (err.response.status !== 404) {
          console.error(err);
        }
      }
      setLoading(false);
    };

    fetchProject();
  }, [user.team]); // Re-run if user's team status changes

  // 2. Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post('https://devhub-hackathon-management-website.onrender.com/api/projects/submit', formData);
      toast({
        title: 'Project Saved!',
        description: res.data.msg, // "Project submitted" or "Project updated"
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error Saving Project',
        description: err.response.data.msg || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // If user is not on a team, don't show the form
  if (!hasTeam) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="container.md">
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlowingCard textAlign="center" p={10}>
              <Icon as={FaRocket} boxSize={16} color="neon.cyan" mb={4} />
              <Heading mb={4} className="gradient-text">
                Submit Your Project
              </Heading>
              <Text color="gray.400" fontSize="lg" mb={6}>
                You must create or join a team before you can submit a project.
              </Text>
              <AnimatedButton
                as="a"
                href="/team"
                bg="neon.cyan"
                color="dark.bg"
                size="lg"
                _hover={{
                  bg: 'neon.blue',
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
                }}
              >
                Go to Team Page
              </AnimatedButton>
            </GlowingCard>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  // If user is on a team, show the form
  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={2} mb={6}>
              <Heading
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                textAlign="center"
                className="gradient-text"
              >
                Submit Your Project
              </Heading>
              <Text textAlign="center" color="gray.400" fontSize="lg">
                You can update your submission any time before the deadline
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowingCard p={8}>
              <VStack as="form" onSubmit={handleSubmit} spacing={6}>
                <FormControl isRequired>
                  <FormLabel color="gray.300">Project Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="My Awesome Project"
                    size="lg"
                    _focus={{
                      borderColor: 'neon.cyan',
                      boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Description</FormLabel>
                  <Textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="A short description of what your project does..."
                    rows={6}
                    size="lg"
                    _focus={{
                      borderColor: 'neon.cyan',
                      boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">
                    <HStack>
                      <Icon as={FaGithub} />
                      <Text>GitHub Repository</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    type="url"
                    name="githubLink"
                    value={githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repo"
                    size="lg"
                    _focus={{
                      borderColor: 'neon.cyan',
                      boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">
                    <HStack>
                      <Icon as={FaExternalLinkAlt} />
                      <Text>Demo Link (Optional)</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    type="url"
                    name="demoLink"
                    value={demoLink}
                    onChange={handleChange}
                    placeholder="https://your-demo-link.com"
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
                  leftIcon={<Icon as={FaRocket} />}
                  _hover={{
                    bg: 'neon.blue',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
                  }}
                >
                  Save Project
                </AnimatedButton>
              </VStack>
            </GlowingCard>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default ProjectPage;
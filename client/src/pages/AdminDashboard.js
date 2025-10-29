// client/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  TableContainer,
  Container,
  VStack,
  HStack,
  Icon,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaProjectDiagram, FaUsers, FaShieldAlt, FaEye, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import GlowingCard from '../components/GlowingCard';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionDiv = motion.div;

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleViewProject = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  useEffect(() => {
    // 1. Define an async function to fetch all admin data
    const fetchData = async () => {
      try {
        setLoading(true);
  // 2. Fetch all projects
  const projectRes = await axios.get('https://devhub-hackathon-management-website.onrender.com/api/admin/all-projects');
        setProjects(projectRes.data);

        // 3. Fetch all users
  const userRes = await axios.get('https://devhub-hackathon-management-website.onrender.com/api/admin/all-users');
        setUsers(userRes.data);
      } catch (err) {
        setError('Failed to fetch data. You may not have admin privileges.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 4. Run once on component load

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text color="red.500" fontSize="xl">{error}</Text>
      </Center>
    );
  }

  // 5. Render the dashboard with tabs for Projects and Users
  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack mb={6}>
              <Icon as={FaShieldAlt} boxSize={10} color="neon.purple" />
              <VStack align="start" spacing={0}>
                <Heading
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  className="gradient-text"
                >
                  Admin Dashboard
                </Heading>
                <Text color="gray.400">Manage hackathon data and participants</Text>
              </VStack>
            </HStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowingCard>
              <Tabs variant="enclosed" colorScheme="purple">
                <TabList borderColor="dark.border">
                  <Tab
                    _selected={{
                      color: 'neon.purple',
                      borderColor: 'neon.purple',
                    }}
                  >
                    <Icon as={FaProjectDiagram} mr={2} />
                    All Projects ({projects.length})
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'neon.cyan',
                      borderColor: 'neon.cyan',
                    }}
                  >
                    <Icon as={FaUsers} mr={2} />
                    All Users ({users.length})
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'neon.blue',
                      borderColor: 'neon.blue',
                    }}
                  >
                    <Icon as={FaUsers} mr={2} />
                    Team Members
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* Projects Panel */}
                  <TabPanel px={0}>
                    <TableContainer>
                      <Table variant="simple" size="md">
                        <Thead>
                          <Tr>
                            <Th>Project Title</Th>
                            <Th>Team Name</Th>
                            <Th>Description</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {projects.map((project, index) => (
                            <MotionTr
                              key={project._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.05 }}
                              _hover={{
                                bg: 'whiteAlpha.50',
                              }}
                            >
                              <Td fontWeight="semibold" color="neon.cyan">
                                {project.title}
                              </Td>
                              <Td>
                                <Badge colorScheme="purple" fontSize="sm">
                                  {project.team?.teamName || 'N/A'}
                                </Badge>
                              </Td>
                              <Td maxW="300px" isTruncated color="gray.400">
                                {project.description}
                              </Td>
                              <Td>
                                <IconButton
                                  icon={<Icon as={FaEye} />}
                                  size="sm"
                                  colorScheme="cyan"
                                  variant="ghost"
                                  onClick={() => handleViewProject(project)}
                                  _hover={{
                                    bg: 'rgba(0, 217, 255, 0.1)',
                                    transform: 'scale(1.1)',
                                  }}
                                  aria-label="View project details"
                                />
                              </Td>
                            </MotionTr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>

                  {/* Users Panel */}
                  <TabPanel px={0}>
                    <TableContainer>
                      <Table variant="simple" size="md">
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Team</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {users.map((user, index) => (
                            <MotionTr
                              key={user._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.05 }}
                              _hover={{
                                bg: 'whiteAlpha.50',
                              }}
                            >
                              <Td fontWeight="semibold" color="gray.100">
                                {user.name}
                              </Td>
                              <Td color="gray.400">{user.email}</Td>
                              <Td>
                                <Badge
                                  colorScheme={user.role === 'admin' ? 'purple' : 'cyan'}
                                  fontSize="sm"
                                  textTransform="capitalize"
                                >
                                  {user.role}
                                </Badge>
                              </Td>
                              <Td color="gray.400">
                                {user.team?.teamName || (
                                  <Text as="span" fontStyle="italic" color="gray.600">
                                    No Team
                                  </Text>
                                )}
                              </Td>
                            </MotionTr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>

                  {/* Team Members Panel */}
                  <TabPanel px={0}>
                    <TableContainer>
                      <Table variant="simple" size="md">
                        <Thead>
                          <Tr>
                            <Th>Team Name</Th>
                            <Th>Member Count</Th>
                            <Th>Members</Th>
                            <Th>Project</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {projects.filter(project => project.team).map((project, index) => (
                            <MotionTr
                              key={project.team._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.05 }}
                              _hover={{
                                bg: 'whiteAlpha.50',
                              }}
                            >
                              <Td fontWeight="semibold" color="neon.blue">
                                {project.team.teamName}
                              </Td>
                              <Td>
                                <Badge colorScheme="blue" fontSize="sm">
                                  {project.team.members?.length || 0} Members
                                </Badge>
                              </Td>
                              <Td>
                                <HStack spacing={1} wrap="wrap">
                                  {project.team.members?.map((member) => (
                                    <Badge
                                      key={member._id}
                                      colorScheme="cyan"
                                      variant="subtle"
                                      fontSize="xs"
                                      mr={1}
                                      mb={1}
                                    >
                                      {member.name}
                                    </Badge>
                                  ))}
                                </HStack>
                              </Td>
                              <Td color="gray.400">
                                <Link
                                  color="neon.cyan"
                                  onClick={() => handleViewProject(project)}
                                  _hover={{ textDecoration: 'none', color: 'neon.blue' }}
                                >
                                  {project.title}
                                </Link>
                              </Td>
                            </MotionTr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GlowingCard>
          </MotionBox>
        </VStack>
      </Container>

      {/* Project Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent
          bg="dark.card"
          borderWidth="1px"
          borderColor="neon.cyan"
          boxShadow="0 0 40px rgba(0, 217, 255, 0.3)"
        >
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Heading size="lg" className="gradient-text">
                {selectedProject?.title}
              </Heading>
              <Badge colorScheme="purple" fontSize="md">
                Team: {selectedProject?.team?.teamName || 'N/A'}
              </Badge>
            </VStack>
          </ModalHeader>
          <ModalCloseButton color="gray.400" _hover={{ color: 'neon.cyan' }} />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={6}>
              <Box>
                <Heading size="sm" color="neon.cyan" mb={3}>
                  Description
                </Heading>
                <Text color="gray.300" lineHeight="tall">
                  {selectedProject?.description}
                </Text>
              </Box>

              <Divider borderColor="dark.border" />

              <Box>
                <Heading size="sm" color="neon.cyan" mb={3}>
                  Project Links
                </Heading>
                <VStack align="stretch" spacing={3}>
                  {selectedProject?.githubLink && (
                    <HStack
                      as={Link}
                      href={selectedProject.githubLink}
                      isExternal
                      p={3}
                      bg="dark.surface"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="dark.border"
                      _hover={{
                        borderColor: 'neon.cyan',
                        transform: 'translateX(5px)',
                      }}
                      transition="all 0.3s"
                    >
                      <Icon as={FaGithub} boxSize={5} color="neon.cyan" />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="semibold" color="gray.100">
                          GitHub Repository
                        </Text>
                        <Text fontSize="sm" color="gray.400" isTruncated maxW="400px">
                          {selectedProject.githubLink}
                        </Text>
                      </VStack>
                      <Icon as={FaExternalLinkAlt} color="gray.400" />
                    </HStack>
                  )}

                  {selectedProject?.demoLink && (
                    <HStack
                      as={Link}
                      href={selectedProject.demoLink}
                      isExternal
                      p={3}
                      bg="dark.surface"
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor="dark.border"
                      _hover={{
                        borderColor: 'neon.blue',
                        transform: 'translateX(5px)',
                      }}
                      transition="all 0.3s"
                    >
                      <Icon as={FaExternalLinkAlt} boxSize={5} color="neon.blue" />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight="semibold" color="gray.100">
                          Live Demo
                        </Text>
                        <Text fontSize="sm" color="gray.400" isTruncated maxW="400px">
                          {selectedProject.demoLink}
                        </Text>
                      </VStack>
                      <Icon as={FaExternalLinkAlt} color="gray.400" />
                    </HStack>
                  )}

                  {!selectedProject?.githubLink && !selectedProject?.demoLink && (
                    <Text color="gray.500" fontStyle="italic">
                      No links provided
                    </Text>
                  )}
                </VStack>
              </Box>

              <Divider borderColor="dark.border" />

              <Box>
                <HStack justify="space-between" align="center" mb={3}>
                  <Heading size="sm" color="neon.cyan">
                    Team Members
                  </Heading>
                  <Badge colorScheme="purple" fontSize="sm">
                    {selectedProject?.team?.members?.length || 0} Members
                  </Badge>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {selectedProject?.team?.members?.map((member, index) => (
                    <MotionDiv
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <HStack
                        p={4}
                        bg="dark.surface"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="dark.border"
                        _hover={{
                          borderColor: 'neon.cyan',
                          transform: 'translateY(-2px)',
                          bg: 'rgba(0, 217, 255, 0.05)'
                        }}
                        transition="all 0.3s"
                        h="full"
                      >
                        <Box
                          w="45px"
                          h="45px"
                          borderRadius="full"
                          bg="neon.purple"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xl"
                          fontWeight="bold"
                          color="white"
                          boxShadow="0 0 20px rgba(147, 51, 234, 0.3)"
                        >
                          {member.name.charAt(0)}
                        </Box>
                        <VStack align="start" spacing={1} flex={1}>
                          <Text fontSize="lg" fontWeight="bold" color="white">
                            {member.name}
                          </Text>
                          <HStack spacing={2} flexWrap="wrap">
                            <Text fontSize="sm" color="neon.cyan">
                              {member.email}
                            </Text>
                            <Badge colorScheme="purple" fontSize="xs">
                              Member #{index + 1}
                            </Badge>
                          </HStack>
                        </VStack>
                      </HStack>
                    </MotionDiv>
                  ))}
                </SimpleGrid>
                {!selectedProject?.team?.members?.length && (
                  <Text color="gray.500" fontStyle="italic" textAlign="center" py={4}>
                    No team members found
                  </Text>
                )}
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminDashboard;
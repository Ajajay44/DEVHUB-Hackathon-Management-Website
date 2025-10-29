// client/src/pages/TeamPage.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Spinner,
  Center,
  List,
  ListItem,
  ListIcon,
  Container,
  HStack,
  Icon,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { CheckCircleIcon, CopyIcon } from '@chakra-ui/icons';
import { FaUsers, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import GlowingCard from '../components/GlowingCard';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);

function TeamPage() {
  
  const [team, setTeam] = useState(null); // Will hold the user's team details
  const [loading, setLoading] = useState(true); // Loading state for fetching team
  const toast = useToast();

  // Form states
  const [teamName, setTeamName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  // Function to fetch the user's current team
  const fetchTeam = async () => {
    try {
  // Axios already has our token, thanks to AuthContext
  const res = await axios.get('https://devhub-hackathon-management-website.onrender.com/api/teams/my-team');
      setTeam(res.data); // Save the team data in state
    } catch (err) {
      if (err.response.status !== 404) {
        console.error(err);
      }
    }
    setLoading(false);
  };

  // Fetch the user's team when the page loads
  useEffect(() => {
    fetchTeam();
  }, []);

  // --- Form Handlers ---

  // Handle Create Team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post('https://devhub-hackathon-management-website.onrender.com/api/teams/create', { teamName });
      setTeam(res.data.team); // Update state with the new team
      toast({
        title: 'Team Created!',
        description: `Your invite code is: ${res.data.team.invitationCode}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error Creating Team',
        description: err.response.data.msg || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle Join Team
  const handleJoinTeam = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post('https://devhub-hackathon-management-website.onrender.com/api/teams/join', { invitationCode });
      setTeam(res.data.team); // Update state with the joined team
      toast({
        title: 'Joined Team!',
        description: `You are now a member of ${res.data.team.teamName}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error Joining Team',
        description: err.response.data.msg || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // --- Render Logic ---

  // 1. Show spinner while fetching team data
  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.invitationCode);
    toast({
      title: 'Copied!',
      description: 'Invitation code copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  // 2. If user is on a team, show team details
  if (team) {
    return (
      <Box minH="100vh" py={10}>
        <Container maxW="container.md">
          <VStack spacing={8} align="stretch">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VStack align="start" spacing={2} mb={6}>
                <HStack>
                  <Icon as={FaUsers} boxSize={8} color="neon.cyan" />
                  <Heading
                    fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    className="gradient-text"
                  >
                    {team.teamName}
                  </Heading>
                </HStack>
                <Text fontSize="lg" color="gray.400">
                  Your hackathon team dashboard
                </Text>
              </VStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowingCard>
                <VStack align="stretch" spacing={4}>
                  <Heading size="md">Invitation Code</Heading>
                  <Text color="gray.400">
                    Share this code with your teammates to invite them
                  </Text>
                  <Flex
                    bg="dark.surface"
                    p={4}
                    borderRadius="lg"
                    borderWidth="2px"
                    borderColor="neon.cyan"
                    align="center"
                    justify="space-between"
                    boxShadow="0 0 20px rgba(0, 217, 255, 0.2)"
                  >
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      fontFamily="mono"
                      color="neon.cyan"
                      letterSpacing="wider"
                    >
                      {team.invitationCode}
                    </Text>
                    <IconButton
                      icon={<CopyIcon />}
                      onClick={copyInviteCode}
                      colorScheme="cyan"
                      variant="ghost"
                      size="lg"
                      _hover={{
                        bg: 'rgba(0, 217, 255, 0.1)',
                        transform: 'scale(1.1)',
                      }}
                    />
                  </Flex>
                </VStack>
              </GlowingCard>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlowingCard>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md">Team Members</Heading>
                    <Box
                      px={3}
                      py={1}
                      bg="neon.cyan"
                      color="dark.bg"
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {team.members.length} Members
                    </Box>
                  </HStack>
                  <List spacing={3}>
                    {team.members.map((member, index) => (
                      <MotionBox
                        key={member._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <ListItem
                          p={4}
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
                          <HStack>
                            <ListIcon
                              as={CheckCircleIcon}
                              color="neon.cyan"
                              boxSize={5}
                            />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold" color="gray.100">
                                {member.name}
                              </Text>
                              <Text fontSize="sm" color="gray.400">
                                {member.email}
                              </Text>
                            </VStack>
                          </HStack>
                        </ListItem>
                      </MotionBox>
                    ))}
                  </List>
                </VStack>
              </GlowingCard>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    );
  }

  // 3. If user is NOT on a team, show create/join forms
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
                Team Management
              </Heading>
              <Text textAlign="center" color="gray.400" fontSize="lg">
                Create a new team or join an existing one
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowingCard>
              <Tabs isFitted variant="enclosed" colorScheme="cyan">
                <TabList mb="1em" borderColor="dark.border">
                  <Tab
                    _selected={{
                      color: 'neon.cyan',
                      borderColor: 'neon.cyan',
                    }}
                  >
                    <Icon as={FaUsers} mr={2} />
                    Create Team
                  </Tab>
                  <Tab
                    _selected={{
                      color: 'neon.cyan',
                      borderColor: 'neon.cyan',
                    }}
                  >
                    <Icon as={FaUserPlus} mr={2} />
                    Join Team
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack as="form" onSubmit={handleCreateTeam} spacing={6}>
                      <FormControl isRequired>
                        <FormLabel color="gray.300">Team Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="The Code Wizards"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
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
                        bg="neon.cyan"
                        color="dark.bg"
                        _hover={{
                          bg: 'neon.blue',
                          boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
                        }}
                      >
                        Create Team
                      </AnimatedButton>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack as="form" onSubmit={handleJoinTeam} spacing={6}>
                      <FormControl isRequired>
                        <FormLabel color="gray.300">Invitation Code</FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter team code"
                          value={invitationCode}
                          onChange={(e) => setInvitationCode(e.target.value)}
                          size="lg"
                          fontFamily="mono"
                          letterSpacing="wider"
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
                        bg="neon.purple"
                        color="white"
                        _hover={{
                          bg: 'neon.pink',
                          boxShadow: '0 0 30px rgba(157, 78, 221, 0.6)',
                        }}
                      >
                        Join Team
                      </AnimatedButton>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GlowingCard>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default TeamPage;
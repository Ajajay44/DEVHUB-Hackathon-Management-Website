// client/src/pages/DashboardPage.js
import {
  Box,
  Heading,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Icon,
  Progress,
  // Button removed (unused)
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaCode, FaTrophy } from 'react-icons/fa';
import GlowingCard from '../components/GlowingCard';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);

function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      icon: FaUser,
      label: 'Your Profile',
      value: user?.name || 'Guest',
      color: 'neon.cyan',
      progress: 100,
    },
    {
      icon: FaUsers,
      label: 'Team Status',
      value: user?.team ? 'In Team' : 'No Team',
      color: 'neon.purple',
      progress: user?.team ? 100 : 0,
    },
    {
      icon: FaCode,
      label: 'Projects',
      value: '0 Submitted',
      color: 'neon.blue',
      progress: 0,
    },
    {
      icon: FaTrophy,
      label: 'Rank',
      value: 'Unranked',
      color: 'neon.pink',
      progress: 0,
    },
  ];

  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Welcome Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack align="start" spacing={2}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                className="gradient-text"
              >
                Welcome back, {user?.name}! 👋
              </Heading>
              <Text fontSize="lg" color="gray.400">
                Here's your hackathon dashboard overview
              </Text>
            </VStack>
          </MotionBox>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowingCard glowColor={stat.color}>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="gray.400">
                          {stat.label}
                        </Text>
                        <Heading size="md" color="gray.100">
                          {stat.value}
                        </Heading>
                      </VStack>
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={stat.color}
                        boxShadow={`0 0 20px ${stat.color}`}
                      >
                        <Icon as={stat.icon} boxSize={6} color="dark.bg" />
                      </Box>
                    </HStack>
                    <Progress
                      value={stat.progress}
                      size="sm"
                      colorScheme="cyan"
                      borderRadius="full"
                      bg="dark.surface"
                    />
                  </VStack>
                </GlowingCard>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* User Info Card */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlowingCard>
              <VStack align="start" spacing={4}>
                <Heading size="lg">Account Information</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={1}>
                      Email
                    </Text>
                    <Text fontSize="lg" color="gray.100">
                      {user?.email}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={1}>
                      Role
                    </Text>
                    <Text
                      fontSize="lg"
                      color={user?.role === 'admin' ? 'neon.purple' : 'neon.cyan'}
                      fontWeight="semibold"
                      textTransform="capitalize"
                    >
                      {user?.role}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={1}>
                      Team Status
                    </Text>
                    <Text fontSize="lg" color="gray.100">
                      {user?.team ? 'Active Team Member' : 'No Team Yet'}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={1}>
                      Registration Date
                    </Text>
                    <Text fontSize="lg" color="gray.100">
                      {new Date().toLocaleDateString()}
                    </Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </GlowingCard>
          </MotionBox>

          {/* Quick Actions */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlowingCard>
              <VStack align="start" spacing={4}>
                <Heading size="lg">Quick Actions</Heading>
                <Text color="gray.400">
                  {user?.team
                    ? 'Your team is ready! Start working on your project.'
                    : 'Create or join a team to get started with the hackathon.'}
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  {!user?.team && (
                    <AnimatedButton
                      as={ReactRouterLink}
                      to="/team"
                      size="lg"
                      bg="neon.cyan"
                      color="dark.bg"
                      _hover={{
                        bg: 'neon.blue',
                        boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)',
                      }}
                    >
                      Create/Join Team
                    </AnimatedButton>
                  )}
                  {user?.team && (
                    <AnimatedButton
                      as={ReactRouterLink}
                      to="/project"
                      size="lg"
                      bg="neon.purple"
                      color="white"
                      _hover={{
                        bg: 'neon.pink',
                        boxShadow: '0 0 20px rgba(157, 78, 221, 0.6)',
                      }}
                    >
                      Submit Project
                    </AnimatedButton>
                  )}
                </HStack>
              </VStack>
            </GlowingCard>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default DashboardPage;
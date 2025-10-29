// client/src/pages/HomePage.js
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaTrophy, FaRocket } from 'react-icons/fa';
import CodeRain from '../components/CodeRain';
import GlowingCard from '../components/GlowingCard';
import AnimatedButton from '../components/AnimatedButton';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

function HomePage() {
  const features = [
    {
      icon: FaCode,
      title: 'Build Amazing Projects',
      description: 'Create innovative solutions with cutting-edge technology',
      color: 'neon.cyan',
    },
    {
      icon: FaUsers,
      title: 'Collaborate with Teams',
      description: 'Join forces with talented developers worldwide',
      color: 'neon.purple',
    },
    {
      icon: FaTrophy,
      title: 'Win Exciting Prizes',
      description: 'Compete for amazing rewards and recognition',
      color: 'neon.pink',
    },
    {
      icon: FaRocket,
      title: 'Launch Your Ideas',
      description: 'Turn your concepts into reality in 48 hours',
      color: 'neon.blue',
    },
  ];

  return (
    <Box position="relative" minH="100vh">
      <CodeRain />
      
      {/* Hero Section */}
      <Container maxW="container.xl" pt={20} pb={32}>
        <VStack spacing={8} textAlign="center">
          <MotionHeading
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="bold"
            className="gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build. Innovate. Win.
          </MotionHeading>

          <MotionText
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            color="gray.300"
            maxW="3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join the ultimate hackathon experience. Connect with innovators,
            build groundbreaking projects, and compete for amazing prizes.
          </MotionText>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <AnimatedButton
                as={ReactRouterLink}
                to="/register"
                size="lg"
                fontSize="xl"
                px={8}
                py={6}
                bg="neon.cyan"
                color="dark.bg"
                _hover={{
                  bg: 'neon.blue',
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.8)',
                }}
              >
                Get Started →
              </AnimatedButton>
              <AnimatedButton
                as={ReactRouterLink}
                to="/login"
                size="lg"
                fontSize="xl"
                px={8}
                py={6}
                variant="outline"
                borderColor="neon.cyan"
                color="neon.cyan"
                _hover={{
                  bg: 'rgba(0, 217, 255, 0.1)',
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
                }}
              >
                Sign In
              </AnimatedButton>
            </HStack>
          </MotionBox>

          {/* Floating Stats */}
          <MotionBox
            mt={16}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HStack
              spacing={8}
              className="glass"
              p={6}
              borderRadius="2xl"
              flexWrap="wrap"
              justify="center"
            >
              <VStack spacing={1}>
                <Heading size="xl" color="neon.cyan">
                  1000+
                </Heading>
                <Text color="gray.400" fontSize="sm">
                  Participants
                </Text>
              </VStack>
              <Box h="50px" w="1px" bg="dark.border" />
              <VStack spacing={1}>
                <Heading size="xl" color="neon.purple">
                  48hrs
                </Heading>
                <Text color="gray.400" fontSize="sm">
                  Duration
                </Text>
              </VStack>
              <Box h="50px" w="1px" bg="dark.border" />
              <VStack spacing={1}>
                <Heading size="xl" color="neon.pink">
                  $50K
                </Heading>
                <Text color="gray.400" fontSize="sm">
                  Prize Pool
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="container.xl" pb={20}>
        <VStack spacing={12}>
          <MotionHeading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            textAlign="center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Join Our{' '}
            <Box as="span" className="gradient-text">
              Hackathon?
            </Box>
          </MotionHeading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowingCard glowColor={feature.color} h="full">
                  <VStack spacing={4} align="start">
                    <Flex
                      w="60px"
                      h="60px"
                      borderRadius="lg"
                      bg={`${feature.color}`}
                      align="center"
                      justify="center"
                      boxShadow={`0 0 20px ${feature.color}`}
                    >
                      <Icon as={feature.icon} boxSize={8} color="dark.bg" />
                    </Flex>
                    <Heading size="md" color="gray.100">
                      {feature.title}
                    </Heading>
                    <Text color="gray.400">{feature.description}</Text>
                  </VStack>
                </GlowingCard>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Container maxW="container.xl" pb={20}>
        <MotionBox
          className="glass-strong"
          borderRadius="3xl"
          p={{ base: 8, md: 16 }}
          textAlign="center"
          position="relative"
          overflow="hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          _before={{
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        >
          <VStack spacing={6} position="relative" zIndex={1}>
            <Heading fontSize={{ base: '2xl', md: '4xl' }}>
              Ready to Start Your Journey?
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="2xl">
              Join thousands of developers, designers, and innovators in the
              most exciting hackathon of the year.
            </Text>
            <AnimatedButton
              as={ReactRouterLink}
              to="/register"
              size="lg"
              fontSize="xl"
              px={10}
              py={7}
              bg="neon.cyan"
              color="dark.bg"
              _hover={{
                bg: 'neon.blue',
                boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)',
              }}
            >
              Register Now →
            </AnimatedButton>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default HomePage;
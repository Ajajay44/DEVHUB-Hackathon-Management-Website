import { Box, Text, HStack, Icon } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 217, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 217, 255, 0.5); }
  100% { box-shadow: 0 0 10px rgba(0, 217, 255, 0.3); }
`;

const MotionBox = motion(Box);

const getStatusColor = (status) => {
  switch (status) {
    case 'success':
      return 'neon.cyan';
    case 'error':
      return 'red.400';
    case 'warning':
      return 'orange.400';
    case 'info':
      return 'neon.blue';
    default:
      return 'neon.purple';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return FaCheckCircle;
    case 'error':
      return FaExclamationCircle;
    case 'warning':
      return FaExclamationTriangle;
    case 'info':
      return FaInfoCircle;
    default:
      return FaInfoCircle;
  }
};

const CustomToast = ({ title, status = 'info' }) => {
  const color = getStatusColor(status);
  const StatusIcon = getStatusIcon(status);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="dark.card"
        borderWidth="1px"
        borderColor={color}
        borderRadius="lg"
        p={4}
        animation={`${glowAnimation} 2s infinite`}
        backdropFilter="blur(8px)"
      >
        <HStack spacing={3} align="center">
          <Icon as={StatusIcon} color={color} boxSize={5} />
          <Text color="white" fontWeight="medium">
            {title}
          </Text>
        </HStack>
      </Box>
    </MotionBox>
  );
};

export default CustomToast;
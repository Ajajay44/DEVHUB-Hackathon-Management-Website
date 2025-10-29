// client/src/components/GlowingCard.js
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function GlowingCard({ children, glowColor = 'neon.cyan', ...props }) {
  return (
    <MotionBox
      bg="dark.card"
      borderWidth="1px"
      borderColor="dark.border"
      borderRadius="xl"
      p={6}
      position="relative"
      overflow="hidden"
      whileHover={{
        y: -5,
        boxShadow: `0 10px 30px rgba(0, 217, 255, 0.3)`,
      }}
      transition={{ duration: 0.3 }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'xl',
        padding: '2px',
        background: `linear-gradient(135deg, ${glowColor}, transparent)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
      _hover={{
        _before: {
          opacity: 1,
        },
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

export default GlowingCard;
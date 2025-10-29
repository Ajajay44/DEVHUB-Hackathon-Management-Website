// client/src/components/MouseFollowSpotlight.js
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

function MouseFollowSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  // Don't render on mobile
  if (window.innerWidth <= 768) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      pointerEvents="none"
      zIndex="0"
      opacity="0.3"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 217, 255, 0.15), transparent 40%)`,
      }}
    />
  );
}

export default MouseFollowSpotlight;
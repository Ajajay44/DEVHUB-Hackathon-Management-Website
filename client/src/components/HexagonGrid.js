// client/src/components/HexagonGrid.js
import { Box } from '@chakra-ui/react';

function HexagonGrid() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="0"
      pointerEvents="none"
      opacity="0.03"
      backgroundImage={`
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 50px,
          rgba(0, 217, 255, 0.3) 50px,
          rgba(0, 217, 255, 0.3) 51px
        ),
        repeating-linear-gradient(
          60deg,
          transparent,
          transparent 50px,
          rgba(0, 217, 255, 0.3) 50px,
          rgba(0, 217, 255, 0.3) 51px
        ),
        repeating-linear-gradient(
          120deg,
          transparent,
          transparent 50px,
          rgba(0, 217, 255, 0.3) 50px,
          rgba(0, 217, 255, 0.3) 51px
        )
      `}
      backgroundSize="100px 173.2px"
    />
  );
}

export default HexagonGrid;
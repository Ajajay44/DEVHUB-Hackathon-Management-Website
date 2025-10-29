// client/src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#E0F7FF',
      100: '#B3ECFF',
      200: '#80E1FF',
      300: '#4DD5FF',
      400: '#26CAFF',
      500: '#00D9FF', // Primary Cyan
      600: '#00B8DB',
      700: '#0097B7',
      800: '#007693',
      900: '#005570',
    },
    neon: {
      cyan: '#00D9FF',
      purple: '#9D4EDD',
      pink: '#FF006E',
      blue: '#3A86FF',
      green: '#06FFA5',
    },
    dark: {
      bg: '#0A0E27',
      surface: '#1A1F3A',
      card: '#252B48',
      border: '#2D3454',
    },
  },
  fonts: {
    heading: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'Fira Code', 'Courier New', monospace`,
  },
  styles: {
    global: {
      body: {
        bg: 'dark.bg',
        color: 'gray.100',
        overflow: 'hidden',
        overflowY: 'auto',
      },
      '*::selection': {
        bg: 'neon.cyan',
        color: 'dark.bg',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        transition: 'all 0.3s ease',
      },
      variants: {
        solid: {
          bg: 'neon.cyan',
          color: 'dark.bg',
          _hover: {
            bg: 'neon.blue',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'neon.cyan',
          color: 'neon.cyan',
          _hover: {
            bg: 'rgba(0, 217, 255, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
          },
        },
        ghost: {
          color: 'gray.300',
          _hover: {
            bg: 'whiteAlpha.200',
            color: 'neon.cyan',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'dark.card',
            borderWidth: '1px',
            borderColor: 'dark.border',
            color: 'gray.100',
            _hover: {
              bg: 'dark.surface',
              borderColor: 'neon.cyan',
            },
            _focus: {
              bg: 'dark.surface',
              borderColor: 'neon.cyan',
              boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
            },
            _placeholder: {
              color: 'gray.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: {
          bg: 'dark.card',
          borderWidth: '1px',
          borderColor: 'dark.border',
          color: 'gray.100',
          _hover: {
            bg: 'dark.surface',
            borderColor: 'neon.cyan',
          },
          _focus: {
            bg: 'dark.surface',
            borderColor: 'neon.cyan',
            boxShadow: '0 0 0 1px rgba(0, 217, 255, 0.6)',
          },
          _placeholder: {
            color: 'gray.500',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'dark.card',
          borderWidth: '1px',
          borderColor: 'dark.border',
          borderRadius: 'xl',
          overflow: 'hidden',
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'dark.border',
            color: 'neon.cyan',
            textTransform: 'uppercase',
            fontSize: 'xs',
            letterSpacing: 'wider',
          },
          td: {
            borderColor: 'dark.border',
          },
          tr: {
            _hover: {
              bg: 'whiteAlpha.50',
            },
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            borderColor: 'dark.border',
            color: 'gray.400',
            _selected: {
              color: 'neon.cyan',
              borderColor: 'neon.cyan',
              borderBottomColor: 'dark.card',
              bg: 'dark.card',
            },
            _hover: {
              color: 'neon.cyan',
            },
          },
          tabpanel: {
            bg: 'dark.card',
            borderWidth: '1px',
            borderColor: 'dark.border',
            borderRadius: 'md',
            borderTopRadius: '0',
          },
        },
      },
    },
  },
  shadows: {
    neonCyan: '0 0 20px rgba(0, 217, 255, 0.6)',
    neonPurple: '0 0 20px rgba(157, 78, 221, 0.6)',
    neonPink: '0 0 20px rgba(255, 0, 110, 0.6)',
    glass: '0 8px 32px 0 rgba(0, 217, 255, 0.1)',
  },
});

export default theme;
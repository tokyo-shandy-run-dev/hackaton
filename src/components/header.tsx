'use client'
import { useAnimation, Box, Heading, Image } from "@yamada-ui/react";

const Header = () => {
  const animation = useAnimation({
    keyframes: {
      "0%": {
        bg: "red.500",
      },
      "20%": {
        bg: "green.500",
      },
      "40%": {
        bg: "purple.500",
      },
      "60%": {
        bg: "yellow.500",
      },
      "80%": {
        bg: "blue.500",
      },
      "100%": {
        bg: "red.500",
      },
    },
    duration: "10s",
    iterationCount: "infinite",
    timingFunction: "linear",
  })

  return (
    <Box className="text-lg h-20 md:h-40" p="md" rounded="md" bg="primary" color="white" animation={animation}>
      <Heading size="xl">HackSched</Heading>
    </Box>
  );
}

export default Header;

'use client'
import { useAnimation, Box, Motion, Link } from "@yamada-ui/react";

const JoinProjectButton = () => {
  const animation = useAnimation({
    keyframes: {
      "0%": {
        bg: "red.300",
      },
      "20%": {
        bg: "green.300",
      },
      "40%": {
        bg: "purple.300",
      },
      "60%": {
        bg: "yellow.300",
      },
      "80%": {
        bg: "blue.300",
      },
      "100%": {
        bg: "red.300",
      },
    },
    duration: "10s",
    iterationCount: "infinite",
    timingFunction: "linear",
  })

  return (
    <Motion whileHover={{ scale: 1.1 }}>
      <Link href="join_project" className="no-underline">
        <Box className="grow text-lg md:flex-none md:justify-start mr-4 md:mr-0 md:p-2 md:px-3 md:mb-1" p="md" rounded="md" bg="primary" color="white" animation={animation}>
          Join Project
        </Box>
      </Link>
    </Motion>
  );
}

export default JoinProjectButton;

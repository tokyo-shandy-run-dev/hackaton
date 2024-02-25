'use client'
import { useAnimation, Box, Motion, Link } from "@yamada-ui/react";

const Header = () => {
  const animation = useAnimation({
    keyframes: {
      "0%": {
        bg: "red.400",
      },
      "20%": {
        bg: "green.400",
      },
      "40%": {
        bg: "purple.400",
      },
      "60%": {
        bg: "yellow.400",
      },
      "80%": {
        bg: "blue.400",
      },
      "100%": {
        bg: "red.400",
      },
    },
    duration: "10s",
    iterationCount: "infinite",
    timingFunction: "linear",
  })

  return (
    <Motion whileHover={{ scale: 1.1 }}>
      <Link href="new_project" className="no-underline">
        <Box className="grow text-lg md:flex-none md:justify-start mr-4 md:mr-0 md:p-2 md:px-3 md:mb-1" p="md" rounded="md" bg="primary" color="white" animation={animation}>
          New Project
        </Box>
      </Link>
    </Motion>
  );
}

export default Header;

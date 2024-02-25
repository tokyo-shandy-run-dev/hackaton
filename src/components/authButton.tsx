'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { Box } from "@yamada-ui/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <Box 
      className="text-lg flex flex-none mb-0 md:justify-self-end" 
      p="md" rounded="md" bg="gray.100" color="white"
      onClick={() => session ? signOut() : signIn()}
    >
      {session ? 'Logout' : 'Login'}
    </Box>
  );
}

export default AuthButton;

"use client";
import { Box, Button, ButtonGroup } from "@yamada-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Page = () => {
  const [apiResponse, setApiResponse] = React.useState<unknown>({});
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    console.log("session.user", session?.user);
  }, [session]);
  console.log(process.env.NEXTAUTH_URL);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => setApiResponse(data));
  }, [session]);

  return (
    <Box>
      <div>{JSON.stringify(user)}</div>
      <br />
      <Button onClick={() => signIn("github")}>Login</Button>
      <br />
      <Button onClick={() => signOut()}>Logout</Button>
      <br />
      <div>{JSON.stringify(apiResponse)}</div>
    </Box>
  );
};

export default Page;

"use client";
import { Button, ButtonGroup } from "@yamada-ui/react";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <ButtonGroup>
      <Button onClick={() => signIn("github")}>Login</Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </ButtonGroup>
  );
};

export default page;

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
    const f = async () => {
      {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setApiResponse(data);
        }
      }
    };
    f();
  }, [session]);

  return (
    <Box>
      <div>{JSON.stringify(user)}</div>
      <br />
      <Button onClick={() => signIn("github")}>Login</Button>
      <br />
      <Button onClick={() => signOut()}>Logout</Button>
      <br />
      <Button
        onClick={async () => {
          {
            const res = await fetch("/api/user", {
              method: "POST",
              body: JSON.stringify({
                name: "cou723",
                email: null,
                password: null,
              }),
            });
            console.log("res", res);
            console.log("data", await res.text());
          }
        }}
      >
        Add Account
      </Button>
      <br />
      <Button
        onClick={async () => {
          const res = await fetch("/api/user", {
            method: "DELETE",
          });
          console.log("res", res);
          console.log("data", await res.text());
          // signOut();
        }}
      >
        Delete Me
      </Button>
      <div>{JSON.stringify(apiResponse)}</div>
    </Box>
  );
};

export default Page;

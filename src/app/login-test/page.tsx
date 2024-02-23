"use client";
import React from "react";
import { Button as YamadaButton, ButtonGroup } from "@yamada-ui/react";
import Button from "@mui/material/Button";

const page = () => {
  return (
    <div>
      <Button variant="contained">Login</Button>
      <YamadaButton>Login</YamadaButton>
    </div>
  );
};

export default page;

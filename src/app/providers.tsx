"use client";
import { UIProvider } from "@yamada-ui/providers";
import { SessionProvider } from "next-auth/react";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children: chlidren }) => {
  return (
    <UIProvider>
      <SessionProvider>{chlidren}</SessionProvider>
    </UIProvider>
  );
};

export default Providers;

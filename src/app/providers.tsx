"use client";
import { UIProvider } from "@yamada-ui/providers";
import { ThemeConfig, extendConfig } from "@yamada-ui/react";
import { SessionProvider } from "next-auth/react";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const customConfig = extendConfig(config);

const Providers: React.FC<Props> = ({ children: chlidren }) => {
  return (
    <UIProvider config={customConfig}>
      <SessionProvider>{chlidren}</SessionProvider>
    </UIProvider>
  );
};

export default Providers;

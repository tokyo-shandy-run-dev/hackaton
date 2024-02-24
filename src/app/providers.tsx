"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children: chlidren }) => {
  return <SessionProvider>{chlidren}</SessionProvider>;
};

export default Providers;

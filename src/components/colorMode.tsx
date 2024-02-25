'use client';
import { ColorModeScript, defaultConfig } from "@yamada-ui/react";

const ColorMode = () => {
  return <ColorModeScript initialColorMode={defaultConfig.initialColorMode} />;
}

export default ColorMode;

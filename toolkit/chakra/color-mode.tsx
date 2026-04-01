'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
// import config from 'configs/app';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export type ColorMode = 'light' | 'dark';

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      { ...props }
      attribute="class"
      scriptProps={{ 'data-cfasync': 'false' }}
      // defaultTheme={ config.UI.colorTheme.default?.colorMode }
      defaultTheme="light"
      // original code did not force the theme:
      // forcedTheme={ undefined }
      forcedTheme="light"
      disableTransitionOnChange
    />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

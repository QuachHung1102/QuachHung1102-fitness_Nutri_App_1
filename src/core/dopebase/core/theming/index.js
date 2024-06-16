import React, { Children } from "react";
import { useColorScheme } from 'react-native'
import DNDefaultTheme from './defaults'

export default DNDefaultTheme;

export const DopebaseContext = React.createContext();

const defaultProps = {
  children: null,
  theme: {},
}

export function DopebaseProvider(props = defaultProps) {
  const { theme, children } = props;
  const colorScheme = useColorScheme();
  const overridenTheme = { ...DNDefaultTheme, ...theme };
  const context = {
    theme: overridenTheme,
    colorScheme,
  }
}
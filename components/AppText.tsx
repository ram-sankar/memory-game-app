import React, { useContext } from "react";
import { Text, StyleSheet, Platform } from "react-native";
import ThemeContext from "../common/ThemeContext";
import { KeyValuePairs } from "../constants/modal";
import { sizes } from "../constants/theme";

function AppText({ children, style, ...otherProps }: Props): JSX.Element {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Text style={[styles(theme).testStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = (theme: KeyValuePairs) => StyleSheet.create({
  testStyle: {
    color: theme.gray4,
    fontSize: sizes.body,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }
});

interface Props {
  children: React.ReactNode,
  style?: any,
  [otherProps:string]: any,
}

export default AppText;

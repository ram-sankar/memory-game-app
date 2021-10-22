import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { colors, sizes } from "../constants/theme";

function AppText({ children, style, ...otherProps }: Props): JSX.Element {
  return (
    <Text style={[styles.testStyle, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  testStyle: {
    color: colors.gray4,
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

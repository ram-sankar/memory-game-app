import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";

import { colors, sizes } from "../constants/theme";

function AppScreen({ children, style }: Props) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.appBackGround,
    flex: 1,
  },
  view: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: sizes.padding,
  },
});

interface Props {
  children: React.ReactNode,
  style?: Object,
}

export default AppScreen;

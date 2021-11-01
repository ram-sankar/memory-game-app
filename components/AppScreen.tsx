import React, {useContext} from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";

import { sizes } from "../constants/theme";
import ThemeContext from "../common/ThemeContext";
import { KeyValuePairs } from "../constants/modal";

function AppScreen({ children, style }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={[styles(theme).screen, style]}>
      <View style={[styles(theme).view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = (theme: KeyValuePairs) => StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBackGround,
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

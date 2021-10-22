import React from "react";
import { View, StyleSheet } from "react-native";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";

function Home() {
  return (
    <AppScreen style={styles.container}>
      <View>
        <AppText>Home</AppText>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
export default Home;
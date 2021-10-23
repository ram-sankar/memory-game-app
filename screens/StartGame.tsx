import React, { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";

import AppText from "../components/AppText";
import { colors, sizes } from "../constants/theme";
import { LEVELS } from "../constants/strings";
import AppModal from '../components/AppModel';

function StartGame({onLevelSelect}: Props) {

  return(
    <AppModal isModalVisible={true} onRequestClose height={150} width={300}>
      <AppText style={styles.modalText}>Memory Game</AppText>
      <AppText>Select Level</AppText>
      <View style={styles.levelsContainer}>
        <Pressable
          style={[styles.button]}
          onPress={() => onLevelSelect(LEVELS.BEGINNER)}
        >
          <AppText style={styles.buttonText}>Beginner</AppText>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={() => onLevelSelect(LEVELS.MEDIUM)}
        >
          <AppText style={styles.buttonText}>Medium</AppText>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={() => onLevelSelect(LEVELS.HARD)}
        >
          <AppText style={styles.buttonText}>Hard</AppText>
        </Pressable>
      </View>
    </AppModal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    alignItems: 'center',
    fontSize: sizes.title,
    marginBottom: 15
  },
  levelsContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  scores: {
    fontSize: sizes.body
  },
  button: {
    width: 80,
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10
  },
  buttonText: {
    color: colors.white
  }
});

interface Props {
  onLevelSelect: Function
}
export default StartGame;
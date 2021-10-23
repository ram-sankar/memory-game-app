import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

import AppText from "../components/AppText";
import { colors, sizes } from "../constants/theme";
import AppModal from './../components/AppModel';

function Completed({onResetPress, noOfTurns, bestScore}: Props) {

  return(
    <AppModal isModalVisible={true} onRequestClose height={150} width={300}>
      <AppText style={styles.modalText}>Congrats level completed</AppText>
      <AppText style={styles.scores}>No of turns: {noOfTurns}</AppText>
      <AppText style={styles.scores}>Best Score: {bestScore}</AppText>
      <Pressable
        style={[styles.button]}
        onPress={() => onResetPress()}
      >
        <AppText style={styles.buttonText}>RESTART</AppText>
      </Pressable>
    </AppModal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    alignItems: 'center',
    fontSize: sizes.title,
    marginBottom: 10
  },
  scores: {
    fontSize: sizes.body
  },
  button: {
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
  onResetPress: Function,
  noOfTurns: number,
  bestScore: number
}
export default Completed;
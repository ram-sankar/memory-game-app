import React, { useContext } from "react";
import { StyleSheet, Pressable, View } from "react-native";

import AppText from "../components/AppText";
import { sizes } from "../constants/theme";
import { LEVELS } from "../constants/strings";
import AppModal from '../components/AppModel';
import ThemeContext from "../common/ThemeContext";

function StartGame({onLevelSelect}: Props) {
  const { theme } = useContext(ThemeContext); 
   
  return(
    <AppModal isModalVisible={true} onRequestClose height={150} width={300}>
      <AppText style={styles().modalText}>Memory Game</AppText>
      <AppText>Select Level</AppText>
      <View style={styles().levelsContainer}>
        <Pressable
          style={[styles(theme).button]}
          onPress={() => onLevelSelect(LEVELS.BEGINNER)}
        >
          <AppText style={styles(theme).buttonText}>Beginner</AppText>
        </Pressable>
        <Pressable
          style={[styles(theme).button]}
          onPress={() => onLevelSelect(LEVELS.MEDIUM)}
        >
          <AppText style={styles(theme).buttonText}>Medium</AppText>
        </Pressable>
        <Pressable
          style={[styles(theme).button]}
          onPress={() => onLevelSelect(LEVELS.HARD)}
        >
          <AppText style={styles(theme).buttonText}>Hard</AppText>
        </Pressable>
      </View>
    </AppModal>
  )
}

const styles = (theme?: {[key: string]: string}) => StyleSheet.create({
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
    backgroundColor: theme?.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10
  },
  buttonText: {
    color: theme?.white
  }
});

interface Props {
  onLevelSelect: Function
}
export default StartGame;
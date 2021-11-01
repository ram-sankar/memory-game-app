import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Switch } from "react-native";
import { shuffleArray } from "../common/functions";
import ThemeContext from "../common/ThemeContext";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import { cardValues as mockCardValues } from "../constants/mock";
import { LEVELS } from "../constants/strings";
import { colors, sizes } from "../constants/theme";
import { CardValues } from "../models/CardValues";
import Completed from "./Completed";
import StartGame from "./StartGame";

function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isLevelSelectionModelOpen, setIsLevelSelectionModelOpen] = useState<boolean>(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(theme === colors?.dark);
  const [cardValues, setCardValues] = useState<CardValues[]>([]);
  const [isExecutionPaused, setIsExecutionPaused] = useState<boolean>(false);
  const [letterCount, setLetterCount] = useState<number>(2);
  const [noOfTurns, setNoOfTurns] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [pairCount, setPairCount] = useState<number>(0);
  const [shouldRefreshGrid, setShouldRefreshGrid] = useState<boolean>(false);
  const [isAllMatchFound, setIsAllMatchFound] = useState<boolean>(false);
  
  const onLevelSelect = (selectedLevel: string) => {
    if (selectedLevel === LEVELS.BEGINNER) {
      setLetterCount(2);
    } else if (selectedLevel === LEVELS.MEDIUM) {
      setLetterCount(8);
    } else if (selectedLevel === LEVELS.HARD) {
      setLetterCount(16);
    }
    setShouldRefreshGrid(!shouldRefreshGrid)
    setIsLevelSelectionModelOpen(false);
  }

  const resetData = () => {
    const shuffledStrings = shuffleArray([...mockCardValues.slice(0, letterCount), ...mockCardValues.slice(0, letterCount)])
    const mockCardObject: CardValues[] = shuffledStrings.map((value, index) => ({
      id: index,
      value: value,
      isVisible: false,
      isFound: false,
    }))
    setCardValues(mockCardObject);
    setIsAllMatchFound(false);
    setNoOfTurns(0);
    setPairCount(0);
  }

  useEffect(() => {
    resetData();
  }, [shouldRefreshGrid])

  useLayoutEffect(() => {
    setBestScore(0);
    // setIsLevelSelectionModelOpen(true);
  }, []);

  const checkIfAllMatchesAreFound = () => {
    const matchedCards = cardValues.filter((currentVal) => currentVal.isFound);
    setPairCount(matchedCards.length/2)
    if (matchedCards.length === cardValues.length) {
      setIsAllMatchFound(true);
      if (noOfTurns < bestScore || bestScore === 0) {
        setBestScore(noOfTurns+1)
      }
    }
  }

  const checkForMatchingCards = () => {
    const openCardsValues = cardValues.filter((currentVal) => currentVal.isVisible);
    if (openCardsValues.length === 2) {
      setNoOfTurns(noOfTurns+1);
      setIsExecutionPaused(true);
      setTimeout(() => {
        if (openCardsValues[0].value === openCardsValues[1].value) {
          cardValues[openCardsValues[0].id].isFound = true;
          cardValues[openCardsValues[1].id].isFound = true;
          checkIfAllMatchesAreFound();
        }
        cardValues[openCardsValues[0].id].isVisible = false;
        cardValues[openCardsValues[1].id].isVisible = false;
        setCardValues([...cardValues])
        setIsExecutionPaused(false);
      }, 1000);
    }
  }

  const onCardPress = (item: CardValues, index: number) => {
    if (!isExecutionPaused && !item.isFound) {
      cardValues[index].isVisible = true;
      setCardValues([...cardValues]);
      checkForMatchingCards();
    }
  }

  const setCardStyle = (item: CardValues) => {
    if (item.isFound) {
      return [styles(theme).card, styles(theme).completedCards];
    } else if (item.isVisible) {
      return [styles(theme).card, styles(theme).openCard];
    } else {
      return [styles(theme).card];
    }
  }

  const ScoreCard = () => (
    <View style={styles(theme).scoreCard}>
      <AppText style={styles(theme).scoreCardText}>
        Best: {bestScore}
      </AppText>
      <AppText style={styles(theme).scoreCardText}>
        Pairs Found: {pairCount}
      </AppText>
      <AppText style={styles(theme).scoreCardText}>
        Turns: {noOfTurns}
      </AppText>
    </View>
  )

  const RenderCards = ({item, index}: {item: CardValues, index: number}) => (
    <TouchableOpacity 
      onPress={() => onCardPress(item, index)} 
      style={setCardStyle(item)}
    >
      {item.isVisible && (
        <AppText style={styles(theme).cardText}>
          {item.value}
        </AppText>
      )}
    </TouchableOpacity>
  );

  const changeTheme = () => {
    if (setTheme) {
      setIsDarkModeEnabled(!isDarkModeEnabled)
      setTheme(theme === colors?.dark ? colors?.light : colors?.dark)
    }
  }

  const RenderRadioButton = () => (
    <View style={styles(theme).radioButtonContainer}>
      <AppText style={styles(theme).radioButtonTitle}>Dark Mode</AppText>
      <Switch
        value={isDarkModeEnabled} 
        thumbColor={theme.white}
        trackColor={{
          true: theme.primary
        }}
        onValueChange={changeTheme}
      />
    </View>
  )

  return (
    <AppScreen style={styles(theme).container}>
      {isLevelSelectionModelOpen && <StartGame onLevelSelect={onLevelSelect} />}
      {isAllMatchFound && <Completed resetData={resetData} noOfTurns={noOfTurns} bestScore={bestScore} />}
      <ScoreCard />
      <FlatList
        data={cardValues}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderCards}
        showsVerticalScrollIndicator={false}
        numColumns={4}
      />
      <View style={styles(theme).bottomContainer}>
        <RenderRadioButton />
        <TouchableOpacity onPress={()=>setIsLevelSelectionModelOpen(true)} style={styles(theme).resetButton}>
          <AppText style={styles(theme).resetText}>Reset</AppText>
        </TouchableOpacity>
      </View>
    </AppScreen>
  )
}

const styles = (theme?: {[key: string]: string}) => StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: sizes.padding
  },
  scoreCardText: {
    fontWeight: '700',
    fontSize: sizes.title
  },
  card: {
    backgroundColor: theme?.primary,
    borderColor: theme?.gray,
    margin: 10,
    width: '20%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.radius
  },
  cardText: {
    color: theme?.white,
    fontWeight: '700',
    fontSize: sizes.h1
  },
  completedCards: {
    backgroundColor: theme?.disabledPrimary
  },
  openCard: {
    backgroundColor: theme?.purple
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  resetButton: {
    backgroundColor: theme?.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: sizes.radius
  },
  resetText: {
    color: theme?.white
  },
  radioButtonContainer: {
    flexDirection: 'row'
  },
  radioButtonTitle: {
    marginTop: 15
  }
});
export default Home;
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { shuffleArray } from "../common/functions";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import { cardValues as mockCardValues } from "../constants/mock";
import { colors, sizes } from "../constants/theme";
import { CardValues, LEVELS } from "../models/CardValues";
import Completed from "./Completed";
import StartGame from "./StartGame";

function Home() {
  const [isLevelSelectionModelOpen, setIsLevelSelectionModelOpen] = useState<boolean>(false);
  const [cardValues, setCardValues] = useState<CardValues[]>([]);
  const [isExecutionPaused, setIsExecutionPaused] = useState<boolean>(false);
  const [letterCount, setLetterCount] = useState<number>(2);
  const [noOfTurns, setNoOfTurns] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [pairCount, setPairCount] = useState<number>(0);
  const [isAllMatchFound, setIsAllMatchFound] = useState<boolean>(false);
  
  const onLevelSelect = (selectedLevel: LEVELS) => {
    setIsLevelSelectionModelOpen(false);
    if (selectedLevel.BEGINNER) {
      setLetterCount(2);
    }
  }

  const onResetPress = () => {
    let shuffledStrings = shuffleArray([...mockCardValues, ...mockCardValues])
    shuffledStrings = [...shuffledStrings, 'J', 'J']
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

  useLayoutEffect(() => {
    setBestScore(0);
    onResetPress();
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
      return [styles.card, styles.completedCards];
    } else if (item.isVisible) {
      return [styles.card, styles.openCard];
    } else {
      return [styles.card];
    }
  }

  const ScoreCard = () => (
    <View style={styles.scoreCard}>
      <AppText style={styles.scoreCardText}>
        Best: {bestScore}
      </AppText>
      <AppText style={styles.scoreCardText}>
        Pairs Found: {pairCount}
      </AppText>
      <AppText style={styles.scoreCardText}>
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
        <AppText style={styles.cardText}>
          {item.value}
        </AppText>
      )}
    </TouchableOpacity>
  );

  return (
    <AppScreen style={styles.container}>
      {isLevelSelectionModelOpen && <StartGame onLevelSelect={onLevelSelect} />}
      {isAllMatchFound && <Completed onResetPress={onResetPress} noOfTurns={noOfTurns} bestScore={bestScore} />}
      <ScoreCard />
      <FlatList
        data={cardValues}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderCards}
        showsVerticalScrollIndicator={false}
        numColumns={4}
      />
      <TouchableOpacity onPress={onResetPress} style={styles.resetButton}>
        <AppText style={styles.resetText}>Reset</AppText>
      </TouchableOpacity>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.primary,
    borderColor: colors.gray,
    margin: 10,
    width: '20%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.radius
  },
  cardText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: sizes.h1
  },
  completedCards: {
    backgroundColor: colors.disabledPrimary
  },
  openCard: {
    backgroundColor: colors.purple
  },
  resetButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: sizes.radius
  },
  resetText: {
    color: colors.white
  }
});
export default Home;
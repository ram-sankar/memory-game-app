import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import { shuffleArray } from "../common/functions";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import { cardValues as mockCardValues } from "../constants/mock";
import { colors, sizes } from "../constants/theme";
import { CardValues } from "../models/CardValues";

function Home() {
  const [cardValues, setCardValues] = useState<CardValues[]>([]);
  const [isExecutionPaused, setIsExecutionPaused] = useState<boolean>(false);
  const [noOfTurns, setNoOfTurns] = useState<number>(0);
  const [isAllMatchFound, setIsAllMatchFound] = useState<boolean>(false);
  
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
  }

  useLayoutEffect(() => {
    onResetPress();
  }, []);

  const checkIfAllMatchesAreFound = () => {
    const matchedCards = cardValues.filter((currentVal) => currentVal.isFound);
    if (matchedCards.length === cardValues.length) {
      setIsAllMatchFound(true);
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
    <AppText>
      Turns: {noOfTurns}
    </AppText>
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
    alignItems: 'center'
  },
  card: {
    backgroundColor: colors.primary,
    borderColor: colors.gray,
    margin: 10,
    width: '20%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    color: colors.white
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
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { shuffleArray } from "../common/functions";

import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import { cardValues as mockCardValues } from "../constants/mock";
import { colors } from "../constants/theme";
import { CardValues } from "../models/CardValues";

function Home() {
  const [cardValues, setCardValues] = useState<CardValues[]>([]);
  const [isExecutionPaused, setIsExecutionPaused] = useState<boolean>(false);


  useLayoutEffect(() => {
    let shuffledStrings = shuffleArray([...mockCardValues, ...mockCardValues])
    shuffledStrings = [...shuffledStrings, 'J', 'J']
    const mockCardObject: CardValues[] = shuffledStrings.map((value, index) => ({
      id: index,
      value: value,
      isVisible: false,
      isFound: false,
    }))
    setCardValues(mockCardObject);
  }, [])

  const checkForMatchingCards = () => {
    const openCardsValues = cardValues.filter((currentVal) => currentVal.isVisible);
    if (openCardsValues.length === 2) {
      if (openCardsValues[0].value === openCardsValues[1].value) {
        cardValues[openCardsValues[0].id].isFound = true;
        cardValues[openCardsValues[1].id].isFound = true;
      }
      setIsExecutionPaused(true);
      setTimeout(() => {
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

  const RenderCards = ({item, index}: {item: CardValues, index: number}) => (
    <TouchableOpacity 
      onPress={() => onCardPress(item, index)} 
      style={item.isFound ? [styles.card, styles.completedCards] : [styles.card]}
    >
      {item.isVisible && (
        <AppText>
          {item.value}
        </AppText>
      )}
    </TouchableOpacity>
  );

  return (
    <AppScreen style={styles.container}>
      <View>
        <FlatList
          data={cardValues}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderCards}
          showsVerticalScrollIndicator={false}
          numColumns={4}
        />
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  card: {
    elevation: 1,
    borderColor: colors.gray,
    margin: 10,
    width: '20%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  completedCards: {
    backgroundColor: colors.primary
  }
});
export default Home;
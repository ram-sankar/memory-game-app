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
  useLayoutEffect(() => {
    const shuffledStrings = shuffleArray([...mockCardValues, ...mockCardValues])
    const mockCardObject: CardValues[] = shuffledStrings.map((value, index) => ({
      id: index,
      value: value,
      isVisible: true,
      isFound: false,
    }))
    setCardValues(mockCardObject);
  }, [])

  const onCardPress = (item: CardValues) => {
    console.log(item)
  }

  const RenderCards = ({item, index}: {item: CardValues, index: number}) => (
    <TouchableOpacity onPress={() => onCardPress(item)} style={styles.card}>
      {item.isVisible && <AppText style={styles.cardText}>
        {item.value}
      </AppText>}
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
  cardText: {
  }
});
export default Home;
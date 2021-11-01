import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import ThemeContext from './common/ThemeContext';
import { KeyValuePairs } from './constants/modal';
import { colors } from './constants/theme';
import Home from './screens/Home';

export default function App() {
  const [theme, setTheme] = useState<KeyValuePairs>(colors.dark);
  return (
    <>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Home/>
      <StatusBar style="auto" />
    </ThemeContext.Provider>
    </>
  );
}

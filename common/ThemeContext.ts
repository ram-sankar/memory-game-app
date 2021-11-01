import React from "react";
import { KeyValuePairs } from "../constants/modal";
import { colors } from "../constants/theme";

export default React.createContext<ThemeContextModal>({theme: colors.light});

interface ThemeContextModal {
  theme: KeyValuePairs,
  setTheme?: Function
}

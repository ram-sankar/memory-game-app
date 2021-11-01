const colors = {
  light: {
    primary: "#fca311",
    lightPrimary: '#fcbf49',
    darkPrimary: '#f77f00',
    disabledPrimary: '#fca31122',
    purple: "#7209b7",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    darkGrey: '#242424',
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    gray3: "#959ba3",
    gray4: "#545454",
    gray5: "#575a5e",
    blue: "#7583ca",
    appBackGround: '#f7f7f7',
    lightGreen: '#e1fce4',
    lightGreen2: '#ddffda',
    red: '#ff0054',
    transparent: '#00000000'
  },
  dark: {
    primary: "#fca311",
    lightPrimary: '#fcbf49',
    darkPrimary: '#f77f00',
    disabledPrimary: '#fca31122',
    purple: "#7209b7",
    tertiary: "#FFE358",
    black: "#ffffff",
    white: "#323643",
    darkGrey: '#d4d4d4',
    gray: "#575a63",
    gray2: "#3f4145",
    gray3: "#666c73",
    gray4: "#bdbdbd",
    gray5: "#bababa",
    blue: "#7583ca",
    appBackGround: '#292929',
    lightGreen: '#e1fce4',
    lightGreen2: '#ddffda',
    red: '#ff0054',
    transparent: '#00000000'
  }
} as { 
  light: {[key: string]: string;},
  dark: {[key: string]: string;}
 };

const sizes = {
  // global sizes
  radius: 6,
  padding: 10,

  // font sizes
  h1: 24,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12
} as { [key: string]: number; };

export { colors, sizes };

const colors = {
  primary: "#fca311",
  lightPrimary: '#fcbf49',
  darkPrimary: '#f77f00',
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
} as { [key: string]: string; };

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

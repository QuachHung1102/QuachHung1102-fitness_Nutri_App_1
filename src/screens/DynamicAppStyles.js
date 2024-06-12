const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#788eec',
  // mainThemeForegroundColor: '#000',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#121212',
  mainThemeForegroundColor: '#788eec',
  // mainThemeForegroundColor: '#000',
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const StyleDict = {
  colorSet,
};

export default StyleDict;

const mainColors = {
  green1: '#498065',
  green2: '#ACD1C0',
  green3: '#8AC5A8',
  black1: '#211f1f',
  white1: '#ffffff',
  gray1: '#B4B4B4',
  gray2: '#E4E4E4',
  gray3: '#6c6c6c',
  gray4: '#e9e9e9',
  brown: '#EFEBD8',
  black2: 'rgba(0,0,0,0.5)',
  red1: '#FF4040',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.black1,
  tertiary: mainColors.green3,
  white: mainColors.white1,
  IconNavigation: {
    primary: mainColors.green2,
    secondary: mainColors.gray3,
  },
  text: {
    primary: mainColors.black1,
    secondary: mainColors.white1,
    tertiary: mainColors.gray1,
    tertiary2: mainColors.gray3,
    menuNonactive: mainColors.gray1,
    menuActive: mainColors.green2,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: mainColors.white1,
    },
    secondary: {
      background: mainColors.white1,
      text: mainColors.black1,
    },
    disable: {
      background: mainColors.gray2,
      text: mainColors.gray1,
    },
  },
  border: mainColors.gray1,
  borderSecondary: mainColors.brown,
  cardLight: mainColors.brown,
  cardGreenIsMe: mainColors.green2,
  cardGreenIsOther: mainColors.green3,
  input: mainColors.gray4,
  loadingScreen: mainColors.black2,
  errorMessage: mainColors.red1,
};

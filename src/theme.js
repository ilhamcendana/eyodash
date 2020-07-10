import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        myGreen: '#62E59F',
        myRed: '#FC5959'
    },
    fonts: {
        muli: 'Muli, sans-serif',
    },
};

export default customTheme;
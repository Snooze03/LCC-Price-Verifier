export const COLORS = {
    // main/brand colors of lcc
    primaryOne: 'rgba(0, 80, 157, 0.7)', // blue
    primaryTwo: 'rgba(253, 197, 0, 0.6)', // yellow

    // variations e.g., hover/pressed states
    primaryOneLight: 'rgba(0, 80, 157, 0.5)',
    primaryTwoLight: 'rgba(253, 197, 0, 0.4)',
    primaryOneDark: 'rgba(0, 80, 157, 0.9)',
    primaryTwoDark: 'rgba(253, 197, 0, 0.8)',

    // borders
    border: 'rgba(208, 208, 208, 1.0)',

    // background
    background: 'rgba(255, 255, 255, 1.0)',
    alt_background: 'rgba(241, 241, 241, 1.0)',

    // shadows
    shadow: 'rgba(0, 0, 0, 1.0)',

    // Text
    text: 'rgba(0, 0, 0, 1.0)',
    textLight: 'rgba(255, 255, 255, 1.0)',
    textMuted: 'rgba(117, 119, 125, 1.0)',

    // errors
    error: 'rgba(255, 49, 0, 1.0)',
    errorLight: 'rgba(252, 90, 90, 0.3)',
};

export const FONTS = {
    regular: 'Inter-Regular',
    bold: 'Inter-Bold',
};

export const TYPOGRAPHY = {
    h1: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        lineHeight: 40,
    },
    h2: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        lineHeight: 30,
    },
    body: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        lineHeight: 24,
    },
    caption: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        lineHeight: 16,
    },
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    ['2xl']: 48,
    ['3xl']: 64,
};

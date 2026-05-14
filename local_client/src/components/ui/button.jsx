import { Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/constants/styles';
import { AppText } from './app-text';
import { MotiView } from 'moti';

const VARIANT_COLORS = {
    primary: {
        base: COLORS.primaryOne,
        dark: COLORS.primaryOneDark,
    },
    secondary: {
        base: COLORS.primaryTwo,
        dark: COLORS.primaryTwoDark,
    },
};

function Button({ variant = 'primary', style, children, onPress, ...props }) {
    const theme = VARIANT_COLORS[variant] || VARIANT_COLORS.primary;

    return (
        <Pressable {...props} onPress={onPress}>
            {({ pressed }) => (
                <MotiView
                    animate={{
                        backgroundColor: pressed ? theme.dark : theme.base,
                        scale: pressed ? 0.95 : 1,
                    }}
                    transition={{ type: 'timing', duration: 150 }}
                    style={[styles.base, style]}
                >
                    <AppText style={styles.text}>{children}</AppText>
                </MotiView>
            )}
        </Pressable>
    );
}

export { Button };

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: SPACING.md,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
});

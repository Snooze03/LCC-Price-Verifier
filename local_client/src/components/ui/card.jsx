import { StyleSheet, View } from 'react-native';

import { COLORS, SPACING } from '@/constants/styles';
import { AppText } from './app-text';

export function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

export function CardHeader({ children, style }) {
    return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({ children, style }) {
    return <AppText style={[styles.title, style]}>{children}</AppText>;
}

export function CardDescription({ children, style }) {
    return <AppText style={[styles.description, style]}>{children}</AppText>;
}

export function CardContent({ children, style }) {
    return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({ children, style }) {
    return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        width: 'auto',
        height: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: SPACING.sm,

        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SPACING.md,

        shadowColor: COLORS.shadow,
        elevation: 2,
    },
    header: {
        marginVertical: 10,
        gap: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: SPACING.lg,
    },
    description: {
        fontSize: SPACING.md,
        color: COLORS.textMuted,
    },
    content: {
        gap: SPACING.sm,
    },
    footer: {
        marginTop: SPACING.md,
    },
});

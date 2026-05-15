import { View } from 'react-native';

import { COLORS, SIZE } from '@/constants/styles';
import { AppText } from './app-text';
import { ScaledSheet } from 'react-native-size-matters';

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

const styles = ScaledSheet.create({
    card: {
        width: 'auto',
        height: 'auto',
        paddingVertical: '15@ms',
        paddingHorizontal: '15@ms',
        gap: SIZE.sm,

        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZE.md,

        shadowColor: COLORS.shadow,
        elevation: 2,
    },
    header: {
        marginBottom: '10@ms',
        gap: '2@ms',
    },
    title: {
        fontWeight: 'bold',
        fontSize: SIZE.lg,
    },
    description: {
        fontSize: SIZE.md,
        color: COLORS.textMuted,
    },
    content: {
        gap: SIZE.sm,
    },
    footer: {
        marginTop: SIZE.md,
    },
});

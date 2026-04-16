import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '@/constants/colors';

function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

function CardHeader({ children, style }) {
    return <View style={[styles.header, style]}>{children}</View>;
}

function CardTitle({ children, style }) {
    return <Text style={[styles.title, style]}>{children}</Text>;
}

function CardSubTitle({ children, style }) {
    return <Text style={[styles.subTitle, style]}>{children}</Text>;
}

function CardContent({ children, style }) {
    return <View style={[styles.content, style]}>{children}</View>;
}

function CardFooter({ children, style }) {
    return <View style={[styles.footer, style]}>{children}</View>;
}

export { Card, CardHeader, CardTitle, CardSubTitle, CardContent, CardFooter };

const styles = StyleSheet.create({
    card: {
        width: 'auto',
        height: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 35,
        gap: 20,

        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 15,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        marginVertical: 10,
        gap: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    subTitle: {
        fontWeight: 'regular',
        fontSize: 18,
        color: COLORS.sub_text,
    },
    content: {
        gap: 10,
    },
    footer: {
        marginTop: 15,
    },
});

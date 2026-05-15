import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { COLORS, SIZE } from '@/constants/styles';
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardFooter,
} from '../ui/card';
import { AppText } from '../ui/app-text';
import { Button } from '../ui/button';

export function StoreModeCard({ data }) {
    if (!data) return;
    const primary =
        data.variant === 'primary' ? COLORS.primaryOne : COLORS.primaryTwo;

    return (
        <Card style={[styles.card, { borderLeftColor: primary }]}>
            <CardHeader>
                <AppText style={styles.header}>{data.title}</AppText>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {data.content.map((item) => {
                    const Icon = item.icon;
                    return (
                        <View key={item.text} style={styles.content}>
                            <Icon color={primary} />
                            <AppText style={styles.text}>{item.text}</AppText>
                        </View>
                    );
                })}
            </CardContent>
            <CardFooter>
                <Button onPress={data.onPress} variant={data.variant}>
                    {data.button}
                </Button>
            </CardFooter>
        </Card>
    );
}

const styles = ScaledSheet.create({
    card: {
        maxWidth: '230@s',
        maxHeight: '200@vs',
        borderLeftWidth: 4,
    },
    header: {
        fontWeight: 'bold',
        fontSize: SIZE.lg,
        letterSpacing: 1.1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        color: COLORS.textMuted,
    },
    footer: {
        flexDirection: 'row',
        gap: 2,
    },
});

import { ScaledSheet } from 'react-native-size-matters';

import { COLORS } from '@/constants/styles';
import { Card, CardHeader, CardContent } from '../ui/card';
import { AppText } from '../ui/app-text';

export function ScanResult({ productDescription, productPrice }) {
    return (
        <Card style={styles.container}>
            <CardHeader style={styles.header}>
                <AppText style={styles.description}>
                    {productDescription}
                </AppText>
            </CardHeader>
            <CardContent style={styles.content}>
                <AppText style={styles.price}>₱ {productPrice}</AppText>
            </CardContent>
        </Card>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: '200@s',
        gap: '1@ms',
    },
    header: {
        backgroundColor: COLORS.primaryOne,
        paddingHorizontal: '10@ms',
        paddingVertical: '8@ms',
        borderRadius: '5@ms',
    },
    description: {
        fontSize: '13@ms',
        fontWeight: 'bold',
        color: COLORS.textLight,
        textAlign: 'center',
    },
    content: {
        backgroundColor: COLORS.primaryTwo,
        paddingHorizontal: '10@ms',
        paddingVertical: '15@ms',
        borderRadius: '5@ms',
    },
    price: {
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: '23@ms',
    },
});

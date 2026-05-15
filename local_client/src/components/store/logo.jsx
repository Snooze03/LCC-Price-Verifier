import { ScaledSheet, ms } from 'react-native-size-matters';
import { Search } from 'lucide-react-native';
import { Image } from 'expo-image';

import { Card } from '@/components/ui/card';
import { AppText } from '../ui/app-text';
import { COLORS } from '@/constants/styles';

export function Logo() {
    return (
        <>
            <Image
                source={require('@/assets/logo.png')}
                style={styles.image}
                contentFit="cover"
            />
            <Card style={styles.container}>
                <AppText style={styles.subtext}>price checker</AppText>
                <Search size={ms(25)} color={COLORS.textLight} />
            </Card>
        </>
    );
}

const styles = ScaledSheet.create({
    image: {
        width: '115@s',
        height: '85@vs',
    },
    container: {
        paddingHorizontal: '20@ms',
        paddingVertical: '8@ms',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8@ms',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#4A7FAF',
        borderRadius: '20@ms',
        backgroundColor: '#4A7FAF',
    },
    subtext: {
        textTransform: 'uppercase',
        fontSize: '15@ms',
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
});

import { View } from 'react-native';
import { ScaledSheet, ms } from 'react-native-size-matters';
import { TriangleAlert } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';
import { AppText } from '../ui/app-text';

export function ConnectionError() {
    return (
        <View style={styles.container}>
            <TriangleAlert size={ms(50)} color={COLORS.error} />
            <AppText style={styles.text}>
                Could not Establish Connection to Central Server
            </AppText>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '5@s',
        paddingVertical: '15@vs',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2@ms',
        borderRadius: '5@ms',
        backgroundColor: COLORS.errorLight,
    },
    text: {
        color: COLORS.error,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});

import { ScaledSheet, ms } from 'react-native-size-matters';
import { Frown } from 'lucide-react-native';

import { Card } from '@/components/ui/card';
import { AppText } from '../ui/app-text';
import { COLORS } from '@/constants/styles';

export function ErrorMessage() {
    return (
        <Card style={styles.container}>
            <AppText style={styles.errorText}>Could not find product</AppText>
            <Frown size={ms(20)} color={'white'} strokeWidth={3} />
        </Card>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: '200@s',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5@ms',
        paddingHorizontal: '10@ms',
        paddingVertical: '15@ms',
        backgroundColor: '#f43f5e',
        borderColor: '#fb7185',
        borderRadius: '8@ms',
        borderWidth: 1,
    },
    errorText: {
        textAlign: 'center',
        fontSize: '15@ms',
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
});

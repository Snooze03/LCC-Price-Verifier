import { StyleSheet, View, Text } from 'react-native';
import { Frown } from 'lucide-react-native';

import { Card } from '@/components/ui/card';

export function ErrorMessage() {
    return (
        <Card style={styles.container}>
            <Text style={styles.errorText}>Could not find product</Text>
            <Frown size={20} color={'white'} strokeWidth={3} />
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#f43f5e',
        borderColor: '#fb7185',
        borderRadius: 10,
        borderWidth: 1,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

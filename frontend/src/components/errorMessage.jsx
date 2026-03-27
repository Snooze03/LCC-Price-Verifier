import { StyleSheet, View, Text } from 'react-native';
import { Frown } from 'lucide-react-native';

export function ErrorMessage() {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Could not find product</Text>
            <Frown size={20} color={'white'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f43f5e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fb7185',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
});

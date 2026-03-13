import { Text, View, StyleSheet } from 'react-native';

export function ResultScan() {
    return (
        <View style={styles.container}>
            <View style={styles.boxWrapper}>
                <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>Description</Text>
                </View>
                <View style={styles.priceBox}>
                    <Text style={styles.priceText}>
                        <Text>₱ PRICE</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxWrapper: {
        width: 320,
        padding: 12,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d0d0d0',
    },
    descriptionBox: {
        backgroundColor: '#4A90D9',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    priceBox: {
        backgroundColor: '#ffed47',
        borderRadius: 10,
        padding: 16,
        alignItems: 'flex-start',
    },
    priceText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
});

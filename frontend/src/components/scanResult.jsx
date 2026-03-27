import { Text, View, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

export function ScanResult({ productDescription, productPrice }) {
    return (
        <View style={styles.boxWrapper}>
            <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>{productDescription}</Text>
            </View>
            <View style={styles.priceBox}>
                <Text style={styles.priceText}>
                    <Text>₱ {productPrice}</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxWrapper: {
        width: 320,
        padding: 12,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    descriptionBox: {
        backgroundColor: COLORS.brand_blue,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: COLORS.brand_yellow,
        padding: 16,
        borderRadius: 10,
    },
    priceText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
});

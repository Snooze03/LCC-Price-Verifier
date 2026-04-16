import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';

import { COLORS } from '@/constants/colors';

export function PromoImage({ image, fileName, date }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                contentFit="fill"
            />
            <Text style={styles.description}>{fileName}</Text>
            <Text style={styles.date}>Duration: {date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '30%',
        height: 'auto',
        aspectRatio: 0.78,
        backgroundColor: 'white',
        marginVertical: 10,
        marginRight: 30,
    },
    image: {
        width: 250,
        height: 250,
    },
    description: {
        fontWeight: 'medium',
        fontSize: 16,
        paddingTop: 8,
        paddingHorizontal: 10,
    },
    date: {
        color: COLORS.sub_text,
        fontSize: 14,
        marginTop: 3,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
});

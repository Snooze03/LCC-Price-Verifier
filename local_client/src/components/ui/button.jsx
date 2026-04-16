import { Pressable, Text, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

function Button({ children, style, onPress }) {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export { Button };

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: COLORS.brand_blue,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

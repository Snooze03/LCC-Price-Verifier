import { Text, StyleSheet } from 'react-native';

function Label({ children, style }) {
    return <Text style={[styles.label, style]}>{children}</Text>;
}

export { Label };

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'medium',
    },
});

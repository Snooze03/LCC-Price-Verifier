import { View, StyleSheet } from 'react-native';

function ScreenContainer({ children, style }) {
    return <View style={[styles.container, style]}>{children}</View>;
}

export { ScreenContainer };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/styles';

export function AppText(props) {
    return (
        <Text {...props} style={[styles.default, props.style]}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    default: {
        fontFamily: FONTS.regular,
        color: COLORS.text,
    },
});

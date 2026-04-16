import { TextInput, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

function Input({ children, style, text, onChangeText, placeHolder }) {
    return (
        <TextInput
            style={[styles.container, style]}
            value={text}
            onChangeText={onChangeText}
            placeholder={placeHolder}
        />
    );
}

export { Input };

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 10,

        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.border,
    },
});

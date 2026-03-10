import { Search } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';

export function PriceCheckBox() {
    return (
        <View style={styles.container}>
            <Text style={styles.textprice}>PRICE</Text>
            <Text style={styles.textprice}>CHECKER</Text>
            <Search size={35} color="white" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#4A7FAF',
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#4A7FAF',
    },
    textprice: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

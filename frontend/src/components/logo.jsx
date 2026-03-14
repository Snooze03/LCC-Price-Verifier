import { Search } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';

export function Logo() {
    return (
        <>
            <Image
                source={require('../assets/logo.png')}
                style={styles.image}
                contentFit="cover"
            />
            <View style={styles.container}>
                <Text style={styles.subtext}>price checker</Text>
                <Search size={35} color="white" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 130,
    },
    container: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#4A7FAF',
        borderRadius: 45,
        backgroundColor: '#4A7FAF',
    },
    subtext: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

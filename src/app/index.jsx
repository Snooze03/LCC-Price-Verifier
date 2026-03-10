import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ScanHere } from '@/components/scan';
import { LogoLCC } from '@/components/logolcc';
import { PriceCheckBox } from '@/components/pricecheckerbox';

export default function HomeScreen() {
    return (
        <ImageBackground
            source={require('../assets/supermarket.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.bannerplaceholder}>BANNER PLACEHOLDER</Text>
                <View style={styles.placeholderbox}>
                    <LogoLCC />
                    <PriceCheckBox />
                    <ScanHere />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
    },
    //  font-bold ">
    placeholderbox: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        paddingTop: 56,
    },
    bannerplaceholder: {
        flex: 0,
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 6,
        height: 250,
        fontWeight: 'bold',
    },
});

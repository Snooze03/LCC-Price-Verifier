import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { ScanButton } from '@/components/scanButton';
import { Logo } from '@/components/logo';

export default function HomeScreen() {
    return (
        // <ImageBackground
        //     source={require('../assets/supermarket.jpg')}
        //     style={styles.background}
        //     resizeMode="cover"
        // >
        <>
            <Text style={styles.bannerPlaceHolder}>BANNER PLACEHOLDER</Text>
            <View style={styles.mainContent}>
                <Logo />
                <ScanButton />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    bannerPlaceHolder: {
        height: 320,
        flex: 0,
        justifyContent: 'center',
        marginBottom: 60,
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        fontWeight: 'bold',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
    },
});

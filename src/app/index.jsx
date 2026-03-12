import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { ScanButton } from '@/components/scanButton';
import { Logo } from '@/components/logo';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { height, width } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {isLandscape ? (
                    // LANDSCAPE: Two columns side by side
                    <View style={styles.landscapeContainer}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.bannerPlaceHolder}>
                                BANNER PLACEHOLDER
                            </Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Logo />

                            <ScanButton />
                        </View>
                    </View>
                ) : (
                    // PORTRAIT: Original stacked layout
                    <View style={styles.portraitContainer}>
                        <Text style={styles.bannerPlaceHolder}>
                            BANNER PLACEHOLDER
                        </Text>
                        <View style={styles.mainContent}>
                            <Logo />
                            <ScanButton />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // Portrait styles
    portraitContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 50,
    },
    bannerPlaceHolder: {
        height: 320,
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

    // Landscape styles
    landscapeContainer: {
        flex: 1,
        flexDirection: 'row', // Side by side
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
});

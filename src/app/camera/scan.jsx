import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function ScanBarcode() {
    const route = useRouter();

    function handleBarcodeScanned({ data }) {
        console.log(data);
        route.back();
    }

    return (
        <View style={styles.container}>
            {/* Camera View */}
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            />

            {/* Overlay */}
            <View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

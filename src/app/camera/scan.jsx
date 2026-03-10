import { CameraView, useCameraPermissions } from 'expo-camera';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Button,
    useWindowDimensions,
} from 'react-native';

export default function ScanBarcode() {
    const [permission, requestPermission] = useCameraPermissions();

    // If permission is still loading
    if (!permission) {
        return <ActivityIndicator />;
    }

    requestPermission;

    // Ask for permission
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function handleBarcodeScanned({ data }) {
        console.log(data);
    }

    // If permission is granted
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

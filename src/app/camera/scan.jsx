import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';

import { BARCODE_TYPES } from '@/constants/barcodeTypes';

export default function ScanBarcode() {
    const router = useRouter();

    function handleBarcodeScanned({ data }) {
        console.log(data);
        router.back();
    }

    return (
        <View style={styles.container}>
            {/* Important note: this probably won't work on the price verifier device. Why? It uses laser to scan not the camera */}
            {/* Refactor this later to support laser scanning */}
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: [...BARCODE_TYPES],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
});

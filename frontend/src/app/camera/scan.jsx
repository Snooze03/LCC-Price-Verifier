import { use, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { usePriceVerifier } from '@/hooks/usePriceVerifier';

import { BARCODE_TYPES } from '@/constants/barcodeTypes';

export default function ScanBarcode() {
    const [barcode, setBarcode] = useState(null);
    const router = useRouter();
    const { price, isLoading, isSuccess } = usePriceVerifier(barcode);

    useEffect(() => {
        if (isSuccess && price) {
            console.log(price);
            router.back();
        }
    }, [price, isSuccess]);

    return (
        <View style={styles.container}>
            {/* Important note: this probably won't work on the price verifier device. Why? It uses laser to scan not the camera */}
            {/* Refactor this later to support laser scanning */}
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: [...BARCODE_TYPES],
                }}
                onBarcodeScanned={({ data }) => setBarcode(data)}
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

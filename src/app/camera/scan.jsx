import { StyleSheet, View, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SCAN_AREA_WIDTH = width * 0.75;
const SCAN_AREA_HEIGHT = SCAN_AREA_WIDTH * 0.5;

export default function ScanBarcode() {
    const router = useRouter();

    function handleBarcodeScanned({ data }) {
        console.log(data);
        router.replace({ pathname: '/', params: { data } });
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            />

            {/* Overlay */}
            <View style={styles.overlay}>
                {/* Top dim area */}
                <View style={styles.dimRow} />

                {/* Layout: dim | clear scan area | dim */}
                <View style={styles.middleRow}>
                    <View style={styles.dimSide} />

                    {/* Clear scan area */}
                    <View style={styles.scanArea}>
                        {/* Corners */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>

                    <View style={styles.dimSide} />
                </View>

                {/* Bottom dim area */}
                <View style={styles.dimRow} />
            </View>
        </View>
    );
}

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 3;
const CORNER_COLOR = '#ffffff';
const DIM_COLOR = 'rgba(0,0,0,0.55)';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
    },

    // Dim regions
    dimRow: {
        flex: 1,
        backgroundColor: DIM_COLOR,
        width: '100%',
    },
    middleRow: {
        flexDirection: 'row',
        height: SCAN_AREA_HEIGHT,
    },
    dimSide: {
        flex: 1,
        backgroundColor: DIM_COLOR,
    },

    // Clear scan window
    scanArea: {
        width: SCAN_AREA_WIDTH,
        height: SCAN_AREA_HEIGHT,
    },

    // Corner guides
    corner: {
        position: 'absolute',
        width: CORNER_SIZE,
        height: CORNER_SIZE,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderColor: CORNER_COLOR,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderColor: CORNER_COLOR,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderLeftWidth: CORNER_THICKNESS,
        borderColor: CORNER_COLOR,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: CORNER_THICKNESS,
        borderRightWidth: CORNER_THICKNESS,
        borderColor: CORNER_COLOR,
    },
});

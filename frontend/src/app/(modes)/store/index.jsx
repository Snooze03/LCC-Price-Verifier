import { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { COLORS } from '@/constants/colors';
import { usePriceVerifier } from '@/hooks/usePriceVerifier';
import { Logo } from '@/components/logo';
import { ScanResult } from '@/components/scanResult';
import { ScanIndicator } from '@/components/scanIndicator';
import { ErrorMessage } from '@/components/errorMessage';

export default function PriceVerifier() {
    const [barcode, setBarcode] = useState('');
    const [scanResult, setScanResult] = useState(false);
    const isPaused = useRef(false);
    const inputRef = useRef(null);

    const { product, isLoading, isSuccess, isError } =
        usePriceVerifier(barcode);

    // @ts-ignore
    inputRef.current?.focus();

    useEffect(() => {
        if (product && isSuccess) {
            setScanResult(true);
        }

        // Time out: reset barcode state every 3 seconds
        setTimeout(() => {
            setScanResult(false);
            setBarcode('');
            isPaused.current = false;
        }, 3000);
    }, [product, isSuccess, isLoading, isError]);

    useEffect(() => {
        if (barcode.length > 0 && !isPaused.current) {
            const timer = setTimeout(() => {
                isPaused.current = true;
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [barcode]);

    const handleScan = (newBarcode) => {
        if (isPaused.current) return;
        setBarcode(newBarcode);
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://lcc.com.ph/wp-content/uploads/2025/10/ECO-BAG-DISCOUNT.jpg',
                    }}
                    contentFit="fill"
                />
            </View>

            <View style={styles.rightColumn}>
                <Logo />
                {/* Hidden text input to catch scanned barcode */}
                <TextInput
                    ref={inputRef}
                    style={styles.textBox}
                    value={barcode}
                    onChangeText={handleScan}
                    onBlur={() => inputRef.current?.focus()}
                    showSoftInputOnFocus={false}
                    pointerEvents="none"
                    caretHidden={true}
                    autoCorrect={false}
                    contextMenuHidden={true}
                />

                {scanResult && !isLoading ? (
                    <ScanResult
                        productDescription={product?.description}
                        productPrice={product?.price}
                    />
                ) : (
                    <>
                        {isError && <ErrorMessage />}
                        <ScanIndicator />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 1,
    },
    textBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        width: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.border,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rightColumn: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

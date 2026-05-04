import { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';
import { usePriceVerifier } from '@/hooks/usePriceVerifier';
import { Logo } from '@/components/logo';
import { ScanResult } from '@/components/scanResult';
import { ScanIndicator } from '@/components/scanIndicator';
import { PromoImage } from '@/components/promoImage';
import { ErrorMessage } from '@/components/errorMessage';
import { ScreenContainer } from '@/components/ui/container';

export default function PriceVerifier() {
    const [barcode, setBarcode] = useState('');
    const [scanResult, setScanResult] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const inputRef = useRef(null);

    const { product, isLoading, isSuccess, isError } =
        usePriceVerifier(barcode);

    // @ts-ignore
    inputRef.current?.focus();

    function handleScan(newBarcode) {
        if (newBarcode.length >= 10) {
            setDisabled(false);
            setBarcode(newBarcode);
            setScanResult(true);
            console.log('Barcode: ', barcode);

            setTimeout(() => {
                setBarcode('');
                setScanResult(false);
                setDisabled(true);
            }, 3000);
        }
    }

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.leftColumn}>
                <PromoImage />
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
                    editable={disabled}
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
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 1,
    },
    textBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        // opacity: 0,
        width: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.border,
    },
    rightColumn: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

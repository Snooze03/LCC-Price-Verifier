import { useState, useRef } from 'react';
import { TextInput, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAtom } from 'jotai';

import { COLORS } from '@/constants/colors';
import { usePriceVerifier } from '@/hooks/usePriceVerifier';
import { productAtom } from '@/atoms/product';
import { Logo } from '@/components/store/logo';
import { ScanResult } from '@/components/store/scanResult';
import { ScanIndicator } from '@/components/store/scanIndicator';
import { PromoImage } from '@/components/store/promoImage';
import { ErrorMessage } from '@/components/store/errorMessage';
import { ScreenContainer } from '@/components/ui/container';

export default function PriceVerifier() {
    const [barcode, setBarcode] = useState('');
    const [scanned, setScanned] = useState(false);
    const [productDisplay, setProductDisplay] = useAtom(productAtom);
    const inputRef = useRef(null);

    const { product, isPending, isFetching, isSuccess, isError } =
        usePriceVerifier(barcode);

    // @ts-ignore
    inputRef.current?.focus();

    if (product) {
        setProductDisplay(product);
    }

    function handleScan(newBarcode) {
        // Checks if barcode only contains digits, the scanner sometimes inputs random characters
        const isValidNumber = /^\d+$/.test(newBarcode);

        if (newBarcode.length >= 10 && isValidNumber) {
            setBarcode(newBarcode);
            setScanned(true);

            // Timeout for barcode reset
            setTimeout(() => {
                setBarcode('');
                setScanned(false);
            }, 3000);

            // Timeout for product display reset
            setTimeout(() => {
                setProductDisplay(null);
            }, 30000);
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
                    editable={!scanned} // disables the scanner
                    showSoftInputOnFocus={false}
                    pointerEvents="none"
                    caretHidden={true}
                    autoCorrect={false}
                    contextMenuHidden={true}
                />

                {isFetching && isPending && <ActivityIndicator />}

                {productDisplay !== null ? (
                    <ScanResult
                        productDescription={productDisplay?.description}
                        productPrice={productDisplay?.price}
                    />
                ) : (
                    <>{isError && <ErrorMessage />}</>
                )}

                {productDisplay === null && <ScanIndicator />}
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
        opacity: 0, // comment this to show textbox
        width: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    rightColumn: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

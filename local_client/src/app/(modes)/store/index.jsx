import { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, ActivityIndicator } from 'react-native';

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
    const [scanned, setScanned] = useState(false);
    const inputRef = useRef(null);

    const { product, isPending, isFetching, isSuccess, isError } =
        usePriceVerifier(barcode);

    // @ts-ignore
    inputRef.current?.focus();

    function handleScan(newBarcode) {
        if (newBarcode.length >= 10) {
            setBarcode(newBarcode);
            setScanned(true);

            setTimeout(() => {
                setBarcode('');
                setScanned(false);
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
                    editable={!scanned}
                    showSoftInputOnFocus={false}
                    pointerEvents="none"
                    caretHidden={true}
                    autoCorrect={false}
                    contextMenuHidden={true}
                />

                {isFetching && isPending && <ActivityIndicator />}

                {scanned && isSuccess ? (
                    <ScanResult
                        productDescription={product?.description}
                        productPrice={product?.price}
                    />
                ) : (
                    <>{isError && <ErrorMessage />}</>
                )}

                {isFetching || (isPending && <ScanIndicator />)}
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
        opacity: 0,
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

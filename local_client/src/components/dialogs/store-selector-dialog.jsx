import { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { localAPI, setBaseUrl } from '@/api/local.api';
import { useStores } from '@/hooks/useStores';
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function StoreSelectorDialog({ isVisible, setIsVisible }) {
    const router = useRouter();
    const { stores, isPending, isError, error } = useStores();

    const [selectedStore, setSelectedStore] = useState(null);
    const [dialogFocus, setDialogFocus] = useState(false);

    useEffect(() => {
        if (stores && stores.length > 0 && selectedStore === null) {
            setSelectedStore(stores[0]);
        }
    }, [stores?.length]);

    // // 🔍 DEBUG
    // console.log('stores:', JSON.stringify(stores, null, 2));
    // console.log('selectedStore:', JSON.stringify(selectedStore, null, 2));

    const handleSelectedStore = async () => {
        if (!selectedStore) return;

        await setBaseUrl(selectedStore.endpoint);
        setIsVisible(false);
        router.push('store');
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <BlurView intensity={10} tint="dark" style={styles.blurStyle}>
                <Card style={{ width: 450 }}>
                    <CardHeader>
                        <CardTitle>Branch Selector</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isPending ? (
                            <View style={[styles.dropdown]}>
                                <Text>Loading...</Text>
                            </View>
                        ) : (
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    dialogFocus && { borderColor: 'blue' },
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={stores}
                                search
                                maxHeight={300}
                                labelField="location"
                                valueField="id"
                                placeholder="Select a branch"
                                onFocus={() => setDialogFocus(true)}
                                onBlur={() => setDialogFocus(false)}
                                value={selectedStore?.id ?? null}
                                onChange={(store) => {
                                    setSelectedStore(store);
                                }}
                            />
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button onPress={handleSelectedStore}>
                            Select Store
                        </Button>
                    </CardFooter>
                </Card>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    blurStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

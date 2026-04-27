import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { api, setBaseUrl } from '@/api/api';
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
import { TextAlignCenter } from 'lucide-react-native';

export function StoreSelectorDialog({ isVisible, setIsVisible }) {
    const router = useRouter();
    const { stores, isPending, isError, error } = useStores();

    const [endpoint, setEndpoint] = useState('');
    const [dialogFocus, setDialogFocus] = useState(false);

    const handleSelectedStore = async () => {
        await setBaseUrl(endpoint);

        setIsVisible(false);
        // router.replace('store');
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
                            <View style={[styles.dropdown]}>Loading...</View>
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
                                valueField="endpoint"
                                placeholder="Select a branch"
                                onFocus={() => setDialogFocus(true)}
                                onBlur={() => setDialogFocus(false)}
                                value={endpoint}
                                onChange={(store) => {
                                    setEndpoint(store.endpoint);
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

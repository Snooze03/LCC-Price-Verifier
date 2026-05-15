import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Modal, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Dropdown } from 'react-native-element-dropdown';

import { setBaseUrl } from '@/api/local.api';
import { useStores } from '@/hooks/useStores';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/styles';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConnectionError } from './connectionError';

export function StoreSelectorDialog({ isVisible, setIsVisible }) {
    const router = useRouter();
    const { stores, refetch, isPending, isSuccess, isError, error } =
        useStores();

    const [selectedStore, setSelectedStore] = useState('');
    const [dropdownFocus, setDropdownFocus] = useState(false);

    async function handleSelectedStore() {
        await setBaseUrl(selectedStore.endpoint);

        setIsVisible(false);
        router.push('store');
    }

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <BlurView
                intensity={1}
                experimentalBlurMethod="dimezisBlurView"
                tint="dark"
                style={styles.blurStyle}
            >
                <Card style={styles.card}>
                    <CardHeader>
                        <CardTitle>Branch Selector</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isPending ? (
                            <ActivityIndicator />
                        ) : !isError ? (
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    dropdownFocus && {
                                        borderColor: COLORS.primaryOne,
                                    },
                                ]}
                                placeholderStyle={TYPOGRAPHY.body}
                                selectedTextStyle={TYPOGRAPHY.body}
                                data={stores || []}
                                search
                                maxHeight={300}
                                labelField="location"
                                valueField="id"
                                placeholder="Select a branch"
                                onFocus={() => setDropdownFocus(true)}
                                onBlur={() => setDropdownFocus(false)}
                                value={selectedStore?.id}
                                onChange={(item) => {
                                    setSelectedStore(item);
                                }}
                            />
                        ) : (
                            <ConnectionError />
                        )}
                    </CardContent>
                    <CardFooter>
                        {isSuccess && (
                            <Button onPress={handleSelectedStore}>
                                Select Store
                            </Button>
                        )}
                        {isError && (
                            <Button onPress={refetch}>Try Again</Button>
                        )}
                    </CardFooter>
                </Card>
            </BlurView>
        </Modal>
    );
}

const styles = ScaledSheet.create({
    card: {
        width: '250@s',
        maxHeight: 'auto',
    },
    blurStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        height: '35@vs',
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: '5@ms',
        paddingHorizontal: '10@ms',
    },
    inputSearchStyle: {
        height: '35@vs',
        fontSize: SPACING.sm,
    },
});

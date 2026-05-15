import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
    MapPin,
    Store,
    CircleCheck,
    CircleDollarSign,
} from 'lucide-react-native';
import { ScreenContainer } from '@/components/ui/container';
import { StoreSelectorDialog } from '@/components/index/store-selector-dialog';
import { localAPI } from '@/api/local.api';

import { StoreModeCard } from '@/components/index/storeModeCard';
import { SIZE } from '@/constants/styles';

export default function Index() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function priceVer() {
        if (!localAPI.defaults.baseURL) {
            return;
        }

        router.push('store');
    }

    function storeSelector() {
        setIsDialogOpen(true);
    }

    const STORE_MODE = [
        {
            variant: 'primary',
            title: 'Price Verifier Display',
            description:
                'Scan any barcode to instantly product price against the store database.',
            content: [
                {
                    icon: CircleCheck,
                    text: 'Real time price look up',
                },
                {
                    icon: CircleDollarSign,
                    text: 'For price verification',
                },
            ],
            onPress: priceVer,
            button: 'Launch Price Verifier',
        },
        {
            variant: 'secondary',
            title: 'Store Selector',
            description:
                'Select your current store location to sync pricing data.',
            content: [
                {
                    icon: Store,
                    text: 'Multi-branch support',
                },
                {
                    icon: MapPin,
                    text: 'Instant location switch',
                },
            ],
            onPress: storeSelector,
            button: 'Select Store',
        },
    ];

    return (
        <ScreenContainer style={styles.container}>
            {STORE_MODE.map((item) => (
                <StoreModeCard key={item.title} data={item} />
            ))}

            {isDialogOpen && (
                <StoreSelectorDialog
                    isVisible={isDialogOpen}
                    setIsVisible={setIsDialogOpen}
                />
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZE['3xl'],
    },
});

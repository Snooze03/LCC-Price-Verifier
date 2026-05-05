import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

import { usePromoImages } from '@/hooks/usePromoImages';
import { localAPI } from '@/api/local.api';

export function PromoImage() {
    const DISPLAY_DELAY = 6000;
    const BASE_URI = localAPI.defaults.baseURL;

    const { imageList, isPending, isError } = usePromoImages();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (imageList.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) =>
                    prev === imageList.length - 1 ? 0 : prev + 1,
                );
            }, DISPLAY_DELAY);
            return () => clearInterval(timer);
        }
    }, [imageList]);

    if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

    if (isError || imageList.length === 0) {
        console.warn('PromoImage: No images found or error occurred');
        return null;
    }

    const currentImage = imageList[currentIndex];
    const fullUri = `${BASE_URI}/images/${currentImage}`;

    return (
        <View style={styles.container}>
            <Image
                key={currentImage}
                source={{ uri: fullUri }}
                style={styles.image}
                contentFit="fill"
                transition={{
                    duration: 3000,
                    effect: 'curl-up',
                    timing: 'ease-in-out',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        aspectRatio: 0.78,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

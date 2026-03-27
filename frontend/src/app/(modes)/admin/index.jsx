import { View, Text, StyleSheet, FlatList } from 'react-native';

import { COLORS } from '@/constants/colors';
import { ScreenContainer } from '@/components/ui/container';
import { PromoImage } from '@/components/promoImage';

export default function Promotions() {
    const IMAGES = [
        {
            fileName: 'promo1',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/12/EARN.jpg',
            date: 'May 12-29, 2026',
        },
        {
            fileName: 'PREMIUM PREMIUM',
            image: 'https://lcc.com.ph/wp-content/uploads/2026/02/CN_EVERLASTING-LOVE.jpg',
            date: 'June 1-2, 2026',
        },
        {
            fileName: 'PROMO NAMBER 2',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/12/ENJOY.jpg',
            date: 'April 17-18, 2026',
        },
        {
            fileName: 'SAMPLE TEXT',
            image: 'https://lcc.com.ph/wp-content/uploads/2026/02/LCC-MALLS-LUCKY-AMPAO.jpg',
            date: 'August 24-30, 2026',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
        {
            fileName: 'BINGO!',
            image: 'https://lcc.com.ph/wp-content/uploads/2025/10/LCC-BINGO-GAME.jpg',
            date: 'October 5-9',
        },
    ];

    return (
        <ScreenContainer>
            {/* Header */}
            <Text style={styles.header}>Promotions</Text>
            <Text style={styles.subHeader}>View active digital signage</Text>

            {/* Lazy load images */}
            <FlatList
                data={IMAGES}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <PromoImage
                        image={item.image}
                        fileName={item.fileName}
                        date={item.date}
                    />
                )}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.brand_blue,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'regular',
        color: COLORS.sub_text,
        marginBottom: 35,
    },
});

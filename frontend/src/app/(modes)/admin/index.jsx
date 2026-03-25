import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function Promotions() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Promotions</Text>
            <Text style={styles.subHeader}>
                Manage active digital signage and display campaigns
            </Text>

            <View style={styles.settingsContainer}>
                {/* Media Assets */}
                <View style={styles.mediaContainer}>
                    <Text>Media Assets</Text>
                </View>

                {/* Display Settings */}
                <View style={styles.mediaContainer}>
                    <Text>Media Assets</Text>
                </View>
            </View>

            <Text style={[styles.header, { marginTop: 15 }]}>
                Active Rotations
            </Text>
            <Text style={styles.subHeader}>
                Manage active digital signage and display campaigns
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    settingsContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    mediaContainer: {
        height: 200,
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.border,
    },
});

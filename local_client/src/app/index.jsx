import { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScanLine, MapPin, CircleCheck } from 'lucide-react-native';
import { ScreenContainer } from '@/components/ui/container';
import { StoreSelectorDialog } from '@/components/dialogs/store-selector-dialog';
import { COLORS } from '@/constants/colors';

function CheckItem({ label, accent }) {
    return (
        <View style={styles.checkRow}>
            <CircleCheck color={accent} size={16} />
            <Text style={styles.checkText}>{label}</Text>
        </View>
    );
}

function IndexCard({
    icon,
    title,
    description,
    checks,
    buttonLabel,
    onPress,
    accent,
}) {
    return (
        <View style={[styles.card, { borderLeftColor: accent }]}>
            <View style={styles.topRow}>
                <View
                    style={[styles.iconBox, { backgroundColor: accent + '22' }]}
                >
                    {icon}
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
                {checks.map((label, i) => (
                    <CheckItem key={i} label={label} accent={accent} />
                ))}
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[
                            styles.launchButton,
                            { backgroundColor: accent + '33' },
                        ]}
                        onPress={onPress}
                    >
                        <Text style={styles.launchButtonText}>
                            {buttonLabel} →
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default function Index() {
    const router = useRouter();
    const [dialog, setDialog] = useState(false);

    return (
        <ScreenContainer style={styles.container}>
            <IndexCard
                icon={
                    <ScanLine
                        size={32}
                        color={COLORS.brand_blue}
                        strokeWidth={2}
                    />
                }
                accent={COLORS.brand_blue}
                title="Price Verifier"
                description="Scan any barcode to instantly verify pricing against the store database."
                checks={['For price verification', 'Real-time stock lookup']}
                buttonLabel="Open Price Verifier"
                onPress={() => router.push('store')}
            />
            <IndexCard
                icon={
                    <MapPin
                        size={32}
                        color={COLORS.brand_yellow}
                        strokeWidth={2}
                    />
                }
                accent={COLORS.brand_yellow}
                title="Branch Selector"
                description="Choose your active store location to sync inventory and pricing data."
                checks={['Multi-branch support', 'Instant location switch']}
                buttonLabel="Select Branch"
                onPress={() => setDialog(true)}
            />

            {dialog && (
                <StoreSelectorDialog
                    isVisible={dialog}
                    setIsVisible={setDialog}
                />
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100,
    },
    card: {
        width: 350,
        backgroundColor: 'white',
        borderRadius: 12,
        borderLeftWidth: 4,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0,
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBody: {
        padding: 16,
        paddingTop: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 6,
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    checkText: {
        fontSize: 13,
        color: '#444',
    },
    buttonContainer: {
        marginTop: 16,
    },
    launchButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    launchButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
});

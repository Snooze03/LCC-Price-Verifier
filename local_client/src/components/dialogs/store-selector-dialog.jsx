import React, { useState, useEffect } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { X, AlertCircle, RefreshCw } from 'lucide-react-native';
import { setBaseUrl } from '@/api/local.api';
import { useStores } from '@/hooks/useStores';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function StoreSelectorDialog({ isVisible, setIsVisible }) {
    const router = useRouter();
    const { stores, isPending, isError, error, refetch } = useStores();

    const [selectedStore, setSelectedStore] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // State to track manual retry attempts to force the loading UI
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        if (stores && stores.length > 0 && !selectedStore) {
            setSelectedStore(stores[0]);
        }
    }, [stores]);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            if (refetch) {
                await refetch();
            }
        } catch (err) {
            console.error('Retry failed:', err);
        } finally {
            // Small delay to ensure the user sees the reconnection attempt
            setTimeout(() => setIsRetrying(false), 800);
        }
    };

    const handleSelectedStore = async () => {
        if (!selectedStore) return;
        try {
            await setBaseUrl(selectedStore.endpoint);
            setIsVisible(false);
            router.push('store');
        } catch (err) {
            console.error('Connection failed:', err);
        }
    };

    const isLoading = isPending || isRetrying;
    const hasData = stores && stores.length > 0 && !isLoading && !isError;

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <BlurView intensity={20} tint="dark" style={styles.blurStyle}>
                <Card style={styles.cardContainer}>
                    <CardHeader style={styles.cardHeader}>
                        <View>
                            <CardTitle>Branch Selector</CardTitle>
                            {isError && !isLoading && (
                                <Text style={styles.errorSubtext}>
                                    Connection Offline
                                </Text>
                            )}
                        </View>
                        <Pressable
                            onPress={() => setIsVisible(false)}
                            style={styles.closeButton}
                        >
                            <X size={20} color="#666" />
                        </Pressable>
                    </CardHeader>

                    <CardContent
                        style={[
                            styles.contentContainer,
                            hasData ? { minHeight: 80 } : { minHeight: 220 },
                        ]}
                    >
                        {isLoading ? (
                            <View style={styles.centerWrapper}>
                                <ActivityIndicator
                                    size="large"
                                    color="#3b82f6"
                                />
                                <Text style={styles.statusText}>
                                    Connecting...
                                </Text>
                            </View>
                        ) : isError ? (
                            <View style={styles.centerWrapper}>
                                <View style={styles.errorBox}>
                                    <View style={styles.iconCircle}>
                                        <AlertCircle
                                            size={28}
                                            color="#b91c1c"
                                        />
                                    </View>
                                    <Text style={styles.errorTitle}>
                                        Server Unreachable
                                    </Text>
                                    <Text style={styles.errorDescription}>
                                        {error?.message ||
                                            'Check your local network connection.'}
                                    </Text>

                                    {/* Symmetrical Red Retry Button */}
                                    <Button
                                        onPress={handleRetry}
                                        style={styles.retryButton}
                                    >
                                        <View style={styles.buttonContent}>
                                            <RefreshCw
                                                size={18}
                                                color="#ffffff"
                                            />
                                            <Text style={styles.retryText}>
                                                Try Again
                                            </Text>
                                        </View>
                                    </Button>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.dropdownWrapper}>
                                <Dropdown
                                    style={[
                                        styles.dropdown,
                                        isFocus && { borderColor: '#3b82f6' },
                                    ]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={stores || []}
                                    search
                                    maxHeight={300}
                                    labelField="location"
                                    valueField="id"
                                    placeholder="Select a branch"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    value={selectedStore?.id}
                                    onChange={(item) => setSelectedStore(item)}
                                />
                            </View>
                        )}
                    </CardContent>

                    <CardFooter style={styles.cardFooter}>
                        <Button
                            style={styles.submitButton}
                            onPress={handleSelectedStore}
                            disabled={isLoading || isError || !selectedStore}
                        >
                            Confirm Selection
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
        padding: 20,
    },
    cardContainer: {
        width: 450,
        backgroundColor: 'white',
        borderRadius: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    contentContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    centerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    dropdownWrapper: {
        paddingVertical: 10,
    },
    closeButton: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#f4f4f5',
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        marginTop: 12,
        fontWeight: '500',
    },
    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#fee2e2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    errorBox: {
        alignItems: 'center',
        width: '100%',
    },
    errorTitle: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 6,
    },
    errorDescription: {
        color: '#6b7280',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    errorSubtext: {
        color: '#ef4444',
        fontSize: 12,
    },
    // The Red Symmetrical Button
    retryButton: {
        height: 48,
        paddingHorizontal: 24,
        backgroundColor: '#ef4444',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        minWidth: 160,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10, // Symmetrical spacing between icon and text
    },
    retryText: {
        fontWeight: '700',
        color: '#ffffff',
        fontSize: 16,
    },
    dropdown: {
        height: 55,
        borderColor: '#e4e4e7',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#a1a1aa',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#18181b',
    },
    cardFooter: {
        paddingTop: 10,
    },
    submitButton: {
        width: '100%',
        height: 50,
    },
});

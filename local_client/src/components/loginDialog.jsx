import React, { useState, useEffect, useCallback } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { setBaseUrl } from '@/api/backend';

// --- Reusable Picker Component ---
const FormPicker = ({
    label,
    value,
    onValueChange,
    items,
    placeholder,
    enabled = true,
}) => (
    <>
        <Label>{label}</Label>
        <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={value}
                onValueChange={onValueChange}
                style={styles.picker}
                enabled={enabled}
            >
                <Picker.Item label={placeholder} value="" />
                {items.map((item) => (
                    <Picker.Item
                        key={item.code}
                        label={item.name}
                        value={item.value}
                    />
                ))}
            </Picker>
        </View>
    </>
);

export const LoginDialog = ({ isVisible, setIsVisible }) => {
    const router = useRouter();
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [provinceData, setProvinceData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial Data Fetch
    useEffect(() => {
        fetch('/province.json')
            .then((res) => res.json())
            .then(setProvinceData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleProvinceChange = (value) => {
        setProvince(value);
        setCity(''); // Reset city when province changes
        setBaseUrl(value);
    };

    const handleLogin = useCallback(async () => {
        if (!province) return alert('Please select a province first!');

        // Add your auth logic here
        router.push('/admin');
        setIsVisible(false);
    }, [province, router, setIsVisible]);

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
                <Card style={styles.card}>
                    <CardHeader>
                        <CardTitle>Login to Branch Account</CardTitle>
                        <CardSubTitle>
                            Forgot? Ask the local I.T department
                        </CardSubTitle>
                    </CardHeader>

                    <CardContent>
                        <FormPicker
                            label="Province:"
                            value={province}
                            onValueChange={handleProvinceChange}
                            placeholder={
                                loading ? 'Loading...' : 'Select a province...'
                            }
                            items={provinceData.map((p) => ({
                                code: p.code,
                                name: p.name,
                                value: p.api,
                            }))}
                        />

                        <FormPicker
                            label="City:"
                            value={city}
                            onValueChange={setCity}
                            enabled={!!province}
                            placeholder={
                                province
                                    ? 'Select a city...'
                                    : 'Select province first...'
                            }
                            items={
                                provinceData.find((p) => p.api === province)
                                    ?.cities || []
                            }
                        />
                    </CardContent>

                    <CardFooter>
                        <Button onPress={handleLogin}>Login</Button>
                    </CardFooter>
                </Card>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { width: 450 },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        overflow: 'hidden',
    },
    picker: { height: 50, width: '100%' },
});

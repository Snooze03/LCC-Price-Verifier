import { useState, useCallback } from 'react';
import { Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { setBaseUrl } from '@/api/backend';
import { useProvinces } from '@/hooks/useProvince';
import { FormPicker } from '@/components/formPicker';
import { api } from '@/api/backend';

export const LoginDialog = ({ isVisible, setIsVisible }) => {
    const router = useRouter();
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const { data: provinceData, loading } = useProvinces();

    const handleProvinceChange = (value) => {
        setProvince(value);
        setCity('');
        setBaseUrl(value);
        // console.log('data', value);
    };

    const handleCityChange = (cityApiUrl) => {
        setCity(cityApiUrl); // Save the selected city's URL
        setBaseUrl(cityApiUrl); // Now call your API setter
        // console.log('API set to:', cityApiUrl);
    };

    const handleLogin = () => {
        // 1. Make this async
        if (!province) return alert('Select a province!');
        router.push('/store');
        try {
            setIsVisible(false);
        } catch (error) {
            // console.error('Login request failed:', error);
            alert('Failed to connect to the selected province.');
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <BlurView
                intensity={30}
                tint="dark"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card style={{ width: 450 }}>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormPicker
                            label="Province:"
                            value={province}
                            onValueChange={handleProvinceChange}
                            items={provinceData.map((p) => ({
                                code: p.code,
                                name: p.name,
                                value: p.api,
                            }))}
                            placeholder={
                                loading ? 'Loading...' : 'Select province...'
                            }
                        />
                        <FormPicker
                            label="City:"
                            value={city}
                            onValueChange={handleCityChange}
                            enabled={!!province}
                            items={
                                provinceData
                                    .find((p) => p.name === province)
                                    ?.cities.map((c) => ({
                                        name: c.name,
                                        value: c.api, // The value passed to onValueChange is the API URL
                                    })) || []
                            }
                            placeholder={
                                province
                                    ? 'Select city...'
                                    : 'Select province first'
                            }
                        />
                    </CardContent>
                    <CardFooter>
                        <Button onPress={handleLogin}>Select</Button>
                    </CardFooter>
                </Card>
            </BlurView>
        </Modal>
    );
};

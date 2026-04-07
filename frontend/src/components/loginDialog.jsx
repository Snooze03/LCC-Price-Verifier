import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginDialog = ({ isVisible, setIsVisible }) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Add custom hook logic to handle auth
    function handleLogin() {
        router.push('/admin');
        setIsVisible(!isVisible);
    }

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
                        <Label>Store number:</Label>
                        <Input
                            text={email}
                            onChangeText={setEmail}
                            placeHolder={'store number'}
                        />

                        <Label>Password:</Label>
                        <Input text={password} onChangeText={setPassword} />
                    </CardContent>

                    <CardFooter>
                        <Button onPress={handleLogin}>Test</Button>
                    </CardFooter>
                </Card>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    card: {
        width: 450,
    },
});

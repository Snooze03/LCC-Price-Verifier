import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

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

export const LoginDialog = ({ isVisible, login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                        <Button>Test</Button>
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

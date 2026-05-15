import { useRef, useEffect } from 'react';
import { ScaledSheet, ms } from 'react-native-size-matters';
import { Animated, View } from 'react-native';
import { ChevronsDown } from 'lucide-react-native';

import { COLORS } from '@/constants/styles';
import { AppText } from '../ui/app-text';

export function ScanIndicator() {
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 15,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <View style={styles.container}>
                <AppText style={[styles.text, { color: COLORS.primaryOne }]}>
                    scan
                </AppText>
                <AppText style={[styles.text, { color: COLORS.primaryTwo }]}>
                    here
                </AppText>
                <ChevronsDown size={ms(30)} />
            </View>
        </Animated.View>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: '40@ms',
        paddingVertical: '10@ms',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8@ms',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: '5@ms',
        borderColor: COLORS.border,
    },
    text: {
        textTransform: 'uppercase',
        fontSize: '25@ms',
        fontWeight: 'bold',
    },
});

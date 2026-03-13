import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ScanButton } from '@/components/scanButton';
import { Logo } from '@/components/logo';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/650242741_1405979961574505_4335770736007184727_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHuYFiqr1AdXR7fxRFmELerFMYODidJE30Uxg4OJ0kTfcErG2va4Pnki1zSiPdBg1hLtSDQskUmwtBmrwz08nAh&_nc_ohc=NJQmRHdMr7QQ7kNvwFOw7kD&_nc_oc=Adnd3Pds_WJ6M-ZrJcj0GAyzHfiDblRRBNDG9ZDYQR0dXYflzdP0RrjZsMTFrqwEJAI&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=q_yErC7P3rIHx_sk-g9DoA&_nc_ss=8&oh=00_AfzFd1XzfdKOWCJ-_4OtiRM-HanVpZnd5HL4TKjfAPfuaQ&oe=69B883F0',
                    }}
                    contentFit="fill"
                />
            </View>

            <View style={styles.rightColumn}>
                <Logo />
                <ScanButton />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 1,
        // backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

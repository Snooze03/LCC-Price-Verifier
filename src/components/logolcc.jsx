import { Image } from 'expo-image';

export function LogoLCC() {
    return (
        <Image
            source={require('../assets/logo.png')}
            style={{ width: 150, height: 150 }}
            contentFit="contain"
        />
    );
}

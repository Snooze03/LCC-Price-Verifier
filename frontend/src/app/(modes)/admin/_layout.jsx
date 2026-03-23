import { View, Text, StyleSheet } from 'react-native';
import { Megaphone, Database } from 'lucide-react-native';
import { Drawer } from 'expo-router/drawer';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import { COLORS } from '@/constants/colors';

export default function Layout() {
    return (
        <Drawer
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    {/* Drawer Header & Sub Text */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Admin Panel</Text>
                        <Text style={styles.subText}>price verifier v1.0</Text>
                    </View>

                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            )}
            screenOptions={{
                headerShown: false,
                drawerType: 'permanent',
                drawerStyle: { width: '25%' },
                drawerActiveBackgroundColor: COLORS.brand_blue,
                drawerActiveTintColor: 'white',
            }}
        >
            {/* Drawer Tabs/Options */}
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Promotions',
                    drawerIcon: ({ color, size }) => (
                        <Megaphone color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="database"
                options={{
                    drawerLabel: 'Database',
                    drawerIcon: ({ color, size }) => (
                        <Database color={color} size={size} />
                    ),
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        marginBottom: 10,
    },
    header: {
        color: COLORS.brand_blue,
        fontWeight: 'bold',
        fontSize: 20,
    },
    subText: {
        color: COLORS.sub_text,
        fontWeight: 'regular',
        fontSize: 14,
    },
});

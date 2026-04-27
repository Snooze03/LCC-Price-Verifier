import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Label } from '@/components/ui/label';

export const FormPicker = ({
    label,
    value,
    onValueChange,
    items,
    placeholder,
    enabled = true,
}) => (
    <View style={{ marginBottom: 12 }}>
        <Label>{label}</Label>
        <View
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                overflow: 'hidden',
            }}
        >
            <Picker
                selectedValue={value}
                onValueChange={onValueChange}
                enabled={enabled}
                style={{ height: 50 }}
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
    </View>
);

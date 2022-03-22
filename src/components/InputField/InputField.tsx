import React from 'react';
import {TextInputProps, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface Props extends TextInputProps {
  error?: string;
  touched?: boolean;
  label: string;
  value: string;
  mode: 'flat' | 'outlined' | undefined;
}
/* should define a property for onChangeText,onBlur,placeholder in the interface Props extends TextInputProps interface.*/
const InputField = ({
  error,
  touched,
  onChangeText,
  onBlur,
  value,
  placeholder,
  label,
  mode,
}: Props) => (
  <View>
    <TextInput
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      label={label}
      mode={mode}
    />
    <View
      style={{
        height: 26,
        justifyContent: 'center',
      }}>
      {!!error && touched && <Text>{error}</Text>}
    </View>
  </View>
);

export default InputField;

import React from 'react';
import RNPickerSelect from 'react-native-picker-select';


export default function Picker() {

  const placeholder = {
    label: "Selecione uma moeda...",
    value: null,
    color: "#3D405B",
  }
  return (
    <RNPickerSelect
    placeholder={placeholder}
    items={[
      {id: 1, label: "USD", value: "USD"},
      {id: 1, label: "EUR", value: "EUR"},
    ]}
    onValueChange={(item)=> console.log(item)}
    />
  );
}
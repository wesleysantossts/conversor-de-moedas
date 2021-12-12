import React from 'react';
import RNPickerSelect from 'react-native-picker-select';


export default function Picker(props) {

  const placeholder = {
    label: "Selecione uma moeda...",
    value: null,
    color: "#3D405B",
  }
  return (
    <RNPickerSelect
    placeholder={placeholder}
    items={props.data}
    onValueChange={(item)=> console.log(props.onChange(item))}
    />
  );
}
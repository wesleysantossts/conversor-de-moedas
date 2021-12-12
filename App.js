import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import tw from "twrnc";
import api from './src/service/api.js';

import Picker from './src/components/Picker';

export default function App() {
  const [moeda, setMoeda] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valor, setValor] = useState(null);

  const [resultado, setResultado] = useState(null)

  useEffect(()=>{
    (async function loadData(){
      const response = await api.get("all");
      const arrayMoedas = []

      Object.keys(response.data).map((key)=>{
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        })
      });

      setMoeda(arrayMoedas);
      setLoading(false);
    })()
  }, []);

  async function converter(){
    const response = await api.get(`all/${moedaSelecionada}-BRL`)
    const resultado = (valor * parseFloat(response.data[moedaSelecionada].ask));

    console.log(response.data[moedaSelecionada].ask)
    setResultado(`R$ ${resultado.toFixed(2)}`)

    // dismiss() - usado para minimizar o teclado
    Keyboard.dismiss()
  }

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={35} color="#121212"/>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda}>
          <Text style={[tw`text-base`, {color: "#3D405B"}]}>Selecine sua moeda:</Text>
          <Picker data={moeda} onChange={(item)=> setMoedaSelecionada(item)}/>
        </View>
        <View style={styles.areaValor}>
          <Text style={[tw`text-base`, {color: "#3D405B"}]}>Digite um valor para converter em (R$)</Text>
          <TextInput
          placeholder={"Ex.: 150"}
          style={tw`w-full`}
          keyboardType='numeric'
          onChangeText={(value)=> setValor(value)}
          />
        </View>
          
        <TouchableOpacity style={[tw`items-center`, {width: "80%", padding: 15, marginBottom: 20, backgroundColor: "#E07A5F", borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]} onPress={converter}>
          <Text style={tw`text-lg text-white font-bold uppercase`}>Converter</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.areaResultado}>
            <Text style={[tw`text-4xl font-bold`, {color: "#3D405B"}]}>{valor ? valor : null} {moedaSelecionada}</Text>
            <Text style={[tw`text-sm`, {color: "#3D405B"}]}>Corresponde a</Text>
            <Text style={[tw`text-4xl font-bold`, {color: "#3D405B"}]}>{resultado}</Text>
          </View>
        )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3D405B"
  },
  areaMoeda:{
    width: "80%",
    padding: 15,
    marginTop: 40,
    marginBottom: 1,
    backgroundColor: "#F4F1DE",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  areaValor:{
    width: "80%",
    marginBottom: 1,
    padding: 15,
    backgroundColor: "#F4F1DE",
    color: "#3D405B"
  },
  areaResultado:{
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    height: 200,
    paddingVertical: 20,
    backgroundColor: "#E07A5F",
    borderRadius: 8
  }
})
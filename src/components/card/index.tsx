import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type CardProps = {
    id: any;
    nome: string;
    endereco: string;
    telefone: string;
    localidade: string;

}
type Props = {
  data: CardProps;
  onPress: () => void;
}

export function Card({ data, onPress }: Props) {

  return (
    <View style={styles.container}>
        <View style={styles.content}>
        <View>
          <Text style={styles.nome}>
            {data.nome}
          </Text>
          <Text style={styles.endereco}>
            {data.endereco}
          </Text>
          <Text style={styles.telefone}>
            {data.telefone}
          </Text>
          <Text style={styles.cidade}>
            {data.localidade}
          </Text>

 
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="edit"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}
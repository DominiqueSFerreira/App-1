import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Center,  Heading, VStack } from "native-base";
import { Input } from '../../components/input/Input';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '../../components/button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-tiny-toast';
import uuid from 'react-native-uuid';

type FormDataProps = {
    id: any
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    localidade: string;
    uf: string
}

const schemaRegister = yup.object({
    nome: yup.string().required("Nome é obrigatório").min(3, "Informe no minimo 3 digitos"),
    sobrenome: yup.string().required("Nome é obrigatório").min(3, "Informe no minimo 3 digitos"),
    email: yup.string().required("Email é obrigatório").min(6, "Informe no minimo 6 digitos").email("E-mail informado não é valido"),
    telefone: yup.string().required("Telefone é obrigatório"),
    cep: yup.string().required("CEP é obrigatório"),
    logradouro: yup.string().required("Rua é obrigatório"),
    numero: yup.string().required("Número é obrigatório"),
    bairro: yup.string().required("Bairro é obrigatório"),
    localidade: yup.string().required("Cidade é obrigatório"),
    uf: yup.string().required("UF é obrigatório"),
})

export const Usuario = () => {

  const {control, handleSubmit, formState: {errors}}  = useForm<FormDataProps>({
      resolver: yupResolver(schemaRegister) as any
  });

  async function handlerRegister(data:FormDataProps){
    data.id = uuid.v4()

    try{
      const reponseData =  await AsyncStorage.getItem('@crud_form:usuario')
      const dbData = reponseData ? JSON.parse(reponseData!) : [];
      console.log(dbData);
      const previewData = [...dbData, data];

      await AsyncStorage.setItem('@crud_form:usuario', JSON.stringify(previewData))
      Toast.showSuccess("Usuário registrado com sucesso")
    }catch (e){
      Toast.showSuccess("Erro ao registrar usuário "+e)
    }


  }
  
  return (
    <KeyboardAwareScrollView>
    <VStack bgColor="gray.300" flex={1} px={5} pb={100}>
        <Center>
          <Controller 
            control={control}
            name="nome"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Primeiro Nome'
              onChangeText={onChange}
              errorMessage={errors.nome?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="sobrenome"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Segundo Nome'
              onChangeText={onChange}
              errorMessage={errors.sobrenome?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="email"
            render={({field: {onChange}})=>(
            <Input
              placeholder='E-mail'
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="cep"
            render={({field: {onChange}})=>(
            <Input
              placeholder='CEP'
              onChangeText={onChange}
              errorMessage={errors.cep?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="logradouro"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Rua'
              onChangeText={onChange}
              errorMessage={errors.logradouro?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="numero"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Número'
              onChangeText={onChange}
              errorMessage={errors.numero?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="bairro"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Bairro'
              onChangeText={onChange}
              errorMessage={errors.logradouro?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="localidade"
            render={({field: {onChange}})=>(
            <Input
              placeholder='Cidade'
              onChangeText={onChange}
              errorMessage={errors.localidade?.message}
            />
            )}
          />
          <Controller 
            control={control}
            name="uf"
            render={({field: {onChange}})=>(
            <Input
              placeholder='UF'
              onChangeText={onChange}
              errorMessage={errors.uf?.message}
            />
            )}
          />
           <Button title="Salvar" onPress={handleSubmit(handlerRegister)}></Button>
        </Center>
      </VStack>
    </KeyboardAwareScrollView>
      
  );
}


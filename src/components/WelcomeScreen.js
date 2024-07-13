import React from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ history }) => {
  const handleLoginPress = () => {
    console.log('Botão Login pressionado');
    history.push('/login'); // Navegar para a tela de login
  };

  const handleCadastroPress = () => {
    console.log('Botão Cadastro pressionado');
    history.push('/cadastro'); // Navegar para a tela de cadastro
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pethelp_icone.png')}
        style={styles.logo}
      />
      <Text>Bem-vindo ao PetHelp!</Text>
      <TouchableOpacity style={styles.button} onClick={handleLoginPress}>
        <Text style={styles.buttonText}>Já possui uma conta? Clique e faça seu login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onClick={handleCadastroPress}>
        <Text style={styles.buttonText}>Clique aqui e crie uma conta agora mesmo!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DD6A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#960000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WelcomeScreen;

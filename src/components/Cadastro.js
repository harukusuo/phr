import React, { useState } from 'react';
//import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Cadastro = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');

  const handleSignup = () => {
    setEmailError('');
    setPasswordError('');
    setPasswordError2('');

    // Validação do campo de e-mail
    if (!email.endsWith('@gmail.com') && !email.endsWith('@outlook.com')) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }

    // Verificação de senhas
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setPasswordError2('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    // Se todos os campos estiverem preenchidos corretamente
    if (firstName && lastName && email && password === confirmPassword) {
      setSignupSuccess(true);
      // Aqui você pode adicionar lógica para enviar os dados para o servidor ou fazer outras ações necessárias
      // Navega para a tela de login após o cadastro bem-sucedido
      history.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.errorMessage}>{emailError}</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Text style={styles.errorMessage}>{passwordError}</Text>
      <Text style={styles.errorMessage}>{passwordError2}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      {signupSuccess && <Text style={styles.successMessage}>Cadastro realizado com sucesso!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#DD6A00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
  },
  errorMessage: {
    marginBottom: 10,
    color: 'red',
    fontSize: 16,
  },
});

export default Cadastro;

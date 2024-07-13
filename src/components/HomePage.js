import React from 'react';
//import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomePage = ({ history }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PetHelp</Text>
      </View>
      
      <View style={styles.content}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Botão Home pressionado')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Botão Pesquisar pressionado')}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Botão Postar pressionado')}>
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Botão Chats pressionado')}>
          <Text style={styles.buttonText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Botão Meu Perfil pressionado')}>
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#DD6A00',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#DD6A00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignSelf: 'flex-end',
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
});

export default HomePage;

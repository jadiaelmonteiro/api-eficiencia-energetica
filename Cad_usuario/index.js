import React, { useState } from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Button,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

export default function Cad_usuario() {
  const navigation = useNavigation();

  /* criar constante para receber os dados do cadastro
  const [cadastro, setCadastro] = useState({
    nome: '',
  });*/

  // e prevente default para pausar o processamento 
  //const valueInput = e => setCadastro({ ...cadastro, [e.target.nome]: e.target.value });

  const [nome, setText] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const cadLogin = async e => {
    e.preventDefault();
    console.log("aaaaaaaaaa", nome, email, senha);
    await fetch("http://localhost/api-eficiencia-energetica/cadastro.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Chamando não cadastrado com sucesso, tente mais tarde!'
        })
      })
  }

  return (
    <View style={styles.container}>


      <View style={styles.containerTitle}>

        <TouchableOpacity style={styles.btnVoltar} >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>EFICIÊNCIA ENERGÉTICA</Text>

      </View>

      <View
        style={styles.containerForm}>

        <Text style={styles.title2}>CRIAR USUÁRIO</Text>

        <form onSubmit={cadLogin}>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            autoCorrect={false}
            onChangeText={newText => setText(newText)}
            defaultValue={nome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={newEmail => setEmail(newEmail)}
            defaultValue={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={newSenha => setSenha(newSenha)}
            defaultValue={senha}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <button type="submit">Enviar</button>
        </form>

        <Text style={styles.x}>Ao criar uma conta, você concorda com os
          Termos de Uso e Privacidade do aplicativo</Text>

      </View>
      <View
        style={styles.containerButton}>
        <TouchableOpacity
          style={styles.btnContinue}>
          <Text
            style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  containerTitle: {
    flex: 0.4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87cefa',
    width: '150%',
  },
  containerButton: {
    flex: 0.4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: '#004c94',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title2: {
    fontSize: 20,
    marginTop: 28,
    marginBottom: 12,
    color: '#004c94',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: '#004c94',
    width: '30%',
    marginBottom: 15,
    color: '#004c94', //azul
    fontSize: 17,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContinue: {
    backgroundColor: '#004c94',
    borderRadius: 50,
    paddingVertical: 8,
    width: '30%',
    alignSelf: 'short',
    bottom: 'null',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,

  },
  continueText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  },
  x: {
    fontSize: 14,
    color: '#004c94',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnVoltar: {
    alignItems: 'left',
    justifyContent: 'up'
  }
})
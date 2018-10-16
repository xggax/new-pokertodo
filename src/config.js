import firebase from 'firebase';
import Rebase from 're-base';


// Inicialização direta com as propriedades de config do firebase e armazenando em FirebaseInfo para uso
// posterior na configuração do Rebase e da constante "db" que é puramente funções do database do firebase 
 const firebaseInfo = firebase.initializeApp({
    apiKey: "AIzaSyCF12OKvLudOsMdkeLDEHc7zpAF9u7i3hY",
    authDomain: "newpokertodo.firebaseapp.com",
    databaseURL: "https://newpokertodo.firebaseio.com",
    projectId: "newpokertodo",
    storageBucket: "newpokertodo.appspot.com",
    messagingSenderId: "427267363690"
  });

  //constante dbRebase criada para uso das funções do Rebase na próxima linha
  const dbRebase = firebase.database(firebaseInfo);
  //constante config criada para uso das funções do Rebase
  const config = Rebase.createClass(dbRebase);

  // Aqui é onde posso colocar os providers quando forem chamados
  export const providers = {
    'google' : new firebase.auth.GoogleAuthProvider(),
  }

  // const db é puramente o firebase.database
  export const db = firebase.database(firebaseInfo);
  // exportando o auth que tbm é puramente o firebase.auth do próprio firebase
  export const auth = firebase.auth();

  //exportando como padrão pra esse arquivo o config 
  export default config;
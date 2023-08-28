import { Constants } from "src/app/shared/constants/settings.class";

export const environment = {
  production: true,
  baseUrl: new Constants().getProdApiURL(),
  firebaseConfig : {
    apiKey: import.meta.env.NG_APP_FIREBASE.apiKey ,
    authDomain: import.meta.env.NG_APP_FIREBASE.authDomain,
    projectId: import.meta.env.NG_APP_FIREBASE.proyecId,
    storageBucket: "prestatools-35370.appspot.com",
    messagingSenderId: "218432434957",
    appId: "1:218432434957:web:4f0ae3ac846cb2debaf644",
    measurementId: "G-H2VVQGELFY"
  },
};

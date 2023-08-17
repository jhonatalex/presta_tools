import { Constants } from "src/app/shared/constants/settings.class";

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyChCasCEmUn6TzMTTPSUITxLL5uZ6TRxTI",
    authDomain: "prestatools-35370.firebaseapp.com",
    projectId: "prestatools-35370",
    storageBucket: "prestatools-35370.appspot.com",
    messagingSenderId: "218432434957",
    appId: "1:218432434957:web:4f0ae3ac846cb2debaf644",
    measurementId: "G-H2VVQGELFY"
  },
  baseUrl: new Constants().getProdApiURL(),
};

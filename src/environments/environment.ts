// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Constants } from "src/app/shared/constants/settings.class";

export const environment = {
  production: true,
  baseUrl: new Constants().getProdApiURL(),
  firebaseConfig : {
    apiKey: "AIzaSyChCasCEmUn6TzMTTPSUITxLL5uZ6TRxTI",
    authDomain: "prestatools-35370.firebaseapp.com",
    projectId: "prestatools-35370",
    storageBucket: "prestatools-35370.appspot.com",
    messagingSenderId: "218432434957",
    appId: "1:218432434957:web:4f0ae3ac846cb2debaf644",
    measurementId: "G-H2VVQGELFY"
  },



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

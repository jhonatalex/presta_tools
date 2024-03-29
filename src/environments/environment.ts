// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Constants } from "src/app/shared/constants/settings.class";

export const environment = {
  firebaseConfig: {
    projectId: 'prestatools-35370',
    appId: '1:218432434957:web:4f0ae3ac846cb2debaf644',
    storageBucket: 'prestatools-35370.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyChCasCEmUn6TzMTTPSUITxLL5uZ6TRxTI',
    authDomain: 'prestatools-35370.firebaseapp.com',
    messagingSenderId: '218432434957',
    measurementId: 'G-H2VVQGELFY',
  },
  production: false,
  baseUrl: new Constants().getProdApiURL(),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

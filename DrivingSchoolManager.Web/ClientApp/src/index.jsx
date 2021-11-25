import React from "react";
import ReactDOM from "react-dom";
import { configureAxios } from "./services/config";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  initializeFirebase,
  askPermissionForNotifications,
} from "./push-notification";

ReactDOM.render(<App />, document.getElementById("root"));

configureAxios();
initializeFirebase();
askPermissionForNotifications();
serviceWorker.register();

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "redux/store/store";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from "recoilize";

// Bootstrap
// import "common/css/bootstrap.min.css";

import App from "src/App";

import "common/css/default.css";
import "common/css/style.css";

// const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
const app = document.getElementById("app");

console.log(
    `%c
 __   __  _______  ______   ___          _______  _______  _______  _______  ___      _______ 
|  |_|  ||       ||      | |   |        |       ||       ||       ||       ||   |    |       |
|       ||    ___||  _    ||   |  ____  |    _  ||    ___||   _   ||    _  ||   |    |    ___|
|       ||   |___ | | |   ||   | |____| |   |_| ||   |___ |  | |  ||   |_| ||   |    |   |___ 
|       ||    ___|| |_|   ||   |        |    ___||    ___||  |_|  ||    ___||   |___ |    ___|
| ||_|| ||   |___ |       ||   |        |   |    |   |___ |       ||   |    |       ||   |___ 
|_|   |_||_______||______| |___|        |___|    |_______||_______||___|    |_______||_______|
Create by 𝒀𝑲𝑺𝒐𝒐𝒏_
`,
    "color:#1976d2",
);

root.render(
    <BrowserRouter>
        <RecoilRoot>
            <RecoilizeDebugger root={app} />
            <App />
        </RecoilRoot>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

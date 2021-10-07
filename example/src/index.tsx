import { NampiProvider } from "nampi-use-api/bundle";
import { StrictMode } from "react";
import { render } from "react-dom";
import "tailwindcss/tailwind.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

const api = process.env.REACT_APP_API;
const auth = process.env.REACT_APP_AUTH;
const client = process.env.REACT_APP_CLIENT;
const realm = process.env.REACT_APP_REALM;

if (!api) {
  throw new Error("No API url provided");
}

render(
  <StrictMode>
    <NampiProvider
      api={api}
      auth={auth}
      client={client}
      defaultLimit={15}
      realm={realm}
      searchTimeout={200}
      silentSsoUri={window.location.origin + "/silent-check-sso.html"}
      sso={true}
    >
      <App />
    </NampiProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

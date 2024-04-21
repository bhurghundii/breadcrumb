//App.js
import { Authenticator } from "@aws-amplify/ui-react";

import { Amplify, Auth } from "aws-amplify";
import awsmobile from "./aws-exports";

import AppRoutes from "./AppRoutes";
import { useState, useEffect } from "react";
import LoginPropsType from "./components/aws-auth/LoginPropsType";
import { getAccountId, getUserName } from "./components/aws-auth/getUserName";
import Loading from "./pages/Loading/Loading.tsx";

Amplify.configure(awsmobile);

function App() {

  const [loginProps, setLoginProps] = useState<LoginPropsType>({isLoggedIn: false, username: "", accountId: ""});
  const [awsReady, setAwsReady] = useState<Boolean>(false);

  useEffect(() => {
    Auth.currentUserInfo().then((result) => {
      setLoginProps({isLoggedIn: (result !== null), username: getUserName(result), accountId: getAccountId(result)});
      setAwsReady(true);
    });

  }, []);

  return (
    <Authenticator.Provider>
      { awsReady ? <AppRoutes props={loginProps} setLoginProps={setLoginProps} /> : <Loading /> }
    </Authenticator.Provider>
  );
}

export default App;

import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./login.css"
import { useNavigate, useLocation } from "react-router";
import { Auth } from "aws-amplify";
import { getAccountId, getUserName } from "../../components/aws-auth/getUserName.tsx";
import getCurrentDate from "../../common/getCurrentDate.tsx";

export function Login({ setLoginProps }: { setLoginProps: any }) {
  const { route } = useAuthenticator((context: any) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/" + getCurrentDate();
  useEffect(() => {
    if (route === "authenticated") {
      Auth.currentUserInfo().then((result) => {
        setLoginProps({isLoggedIn: (result !== null), username: getUserName(result), accountId: getAccountId(result)});
      });
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <View className="auth-wrapper">
      <div className="centered-content"> 
        <Authenticator/>
      </div>
    </View>
  );
}

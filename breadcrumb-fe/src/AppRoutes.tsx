import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout/Layout.tsx";
import AboutYou from "./pages/Protected/AboutYou";
import ForgotPassword from "./pages/Protected/ForgotPassword";
import UserManagement from "./pages/Protected/UserManagement";
import LoginProps from "./components/aws-auth/LoginPropsType";
import getCurrentDate from "./common/getCurrentDate.tsx";
import Page from "./pages/Page/Page.tsx";
import SearchTag from "./pages/SearchTag/SearchTag.tsx";
import TagPage from "./pages/TagPage/TagPage.tsx";

function AppRoutes({
  props,
  setLoginProps,
}: {
  props: LoginProps;
  setLoginProps: any;
}) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route
            index
            element={
              props.isLoggedIn ? (
                <Navigate to={"/date/" + getCurrentDate()} />
              ) : (
                <Home />
              )
            }
          />

            <Route
                path="/searchtag"
                element={
                    props.isLoggedIn ? (
                        <RequireAuth>
                            <SearchTag accountId={props.accountId}/>
                        </RequireAuth>
                    ) : (
                        <Home />
                    )
                }
            />

            <Route
                path="/:id"
                element={
                    props.isLoggedIn ? (
                        <Navigate to={"/date/" + getCurrentDate()} />
                    ) : (
                        <Home />
                    )
                }
            />

            <Route
                path="/date/:dateId"
                element={
                  props.isLoggedIn ? (
                    <RequireAuth>
                      <Page accountId={props.accountId}/>
                    </RequireAuth>
                  ) : (
                    <Home />
                  )
                }
              />

            <Route
                path="/tag/:tag"
                element={
                    props.isLoggedIn ? (
                        <RequireAuth>
                            <TagPage accountId={props.accountId}/>
                        </RequireAuth>
                    ) : (
                        <Home />
                    )
                }
            />

          <Route
            path="/forgotpassword"
            element={
              <RequireAuth>
                <ForgotPassword />
              </RequireAuth>
            }
          />

          <Route
            path="/usermanagement"
            element={
              <RequireAuth>
                <UserManagement />
              </RequireAuth>
            }
          />

          <Route
            path="/aboutyou"
            element={
              <RequireAuth>
                <AboutYou setLoginProps={setLoginProps} />
              </RequireAuth>
            }
          />

          <Route
            path="/login"
            element={<Login setLoginProps={setLoginProps} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

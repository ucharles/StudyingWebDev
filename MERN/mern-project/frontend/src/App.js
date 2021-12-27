import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

const App = () => {
  const [userId, setUserId] = useState();
  const [username, setUserName] = useState();
  const [tokenExpirationDateState, setTokenExpirationDateState] = useState();
  const [token, setToken] = useState();

  // 렌더가 끝난 후에 실행됨

  const login = useCallback((uid, username, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1h
    setTokenExpirationDateState(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        username: username,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserName(username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDateState(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDateState) {
      const remainingTime =
        tokenExpirationDateState.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDateState]);

  useEffect(() => {
    // 토큰이 만료되었는지 확인하는 로직이 들어가야 함
    const storedData = JSON.parse(localStorage.getItem("useData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.username,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      // Switch를 React.Fragment로 바꾸면.. 어디선가 에러가 난다
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/:uid/places" exact>
          <UserPlaces />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:uid/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        username: username,
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

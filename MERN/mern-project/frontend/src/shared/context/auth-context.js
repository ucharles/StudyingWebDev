import { createContext } from "react";

// 컴포넌트 간 공유 가능한 객체.
// 이를 수신하는 모든 구성 요소는 업데이트 된다.
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  username: null,
  login: () => {},
  logout: () => {},
});

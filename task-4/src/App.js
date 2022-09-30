import React from 'react';
import Registration from './components/registration';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from './components/login'
import { fakeAuthProvider } from "./components/auth";

function App() {
   
  return (
    <div className="container">
      <AuthProvider>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

let AuthContext = React.createContext(null);

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
      </ul>

      <Outlet />
    </div>
  );
}

function PublicPage() {
  return (
    <div>
        <ul>
        <li>
          <Link to="/registration">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Outlet />
    </div>
    );
}

export default App;

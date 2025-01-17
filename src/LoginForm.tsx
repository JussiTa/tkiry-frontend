import { useEffect, useState } from "react";

import { useAuthContext } from "./features/auth/hooks/use-auth-context";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, login, logout, me } = useAuthContext();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      try {
        login(email, password);
        //localStorage.setItem("token", response.data.access_token);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    me()
      .catch(() => {})
      .finally(() => console.log("jee"));
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <div className="container" style={{ marginTop: "10vh" }}>
          <form onSubmit={handleLogin}>
            <h2>Kirjaudu sisään</h2>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Käyttäjätunnus:
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Salasana :
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              KIRJAUDU
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </>
  );
};

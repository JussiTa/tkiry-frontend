import { useEffect, useState } from "react";

import { useAuthContext } from "../features/auth/hooks/use-auth-context";
import { Card, Grid } from "@mui/joy";

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
        
        <Card>
      
          <form onSubmit={handleLogin}>
            <h2>Kirjaudu sisään</h2>

            <Grid xs={4} md={10}>

            <label htmlFor="email" className="form-label">
                Käyttäjätunnus
              </label>
            </Grid>
            <Grid xs={4} md={10}>

            
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="email"
                
              />
           </Grid>

           <Grid xs={4} md={10}>
           <label htmlFor="password" className="form-label">
                Salasana
              </label>


           </Grid>
           <Grid xs={4} md={10}>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="password"
              />
            </Grid>
            <button type="submit" className="submit-button">
              KIRJAUDU
            </button>
          </form>
      
        </Card>
      ) : (
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => logout()}>Logout</button>
        </div>

   
      )}
    </>
  );
};

import { Typography } from "@mui/joy";
import { useRouteError } from "react-router-dom";

export const Error =() =>{
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography level="h1">Oops!</Typography>
      <p>Pahoittelut, jotain meni pieleen.</p>
    </div>
  );
}

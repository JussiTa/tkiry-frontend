import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { CreateLotList } from "./CreateLotList";
import { LoginForm } from "./LoginForm";
import { LotListWithCustomer } from "./LotList";
import { Logout } from "./Logout";
import { Payments } from "./Payments";
export const router = createBrowserRouter([
  {
    // path: "/",
    // element: <Root />,
    // errorElement: <Error />,
    // children: [
    //   {
    path: "/",
    element: <App />,
    // errorElement: <Error/>
  },

  {
    path: "/createList",
    element: <CreateLotList />,
  },

  {
    path: "/login",
    element: <LoginForm />,
  },

  {
    path: "/lotlist",
    element: <LotListWithCustomer />,
  },

  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/payments",
    element: <Payments />,
  },
  //   ],
  // },
]);

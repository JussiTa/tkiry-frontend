import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LotList } from "./CreateLotList";
import { LoginForm } from "../LoginForm";
import { LotListWithCustomer } from "./LotList";
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
    element: <LotList />,
  },

  {
    path: "/login",
    element: <LoginForm />,
  },

  {
    path: "/lotlist",
    element: <LotListWithCustomer/>,
  },
  //   ],
  // },
]);

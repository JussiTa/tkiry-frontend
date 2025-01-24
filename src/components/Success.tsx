import { Typography } from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Customer } from "../features/api/types";
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;
export const Success = () => {
  const localStorageCustomer = localStorage.getItem("customer");
  const customer: Customer =
    localStorageCustomer !== null ? JSON.parse(localStorageCustomer) : null;

    const [isSaved, setSaved] = useState(false);
  
  const saveCustomer =(customer: Customer) => {
    const data = customer !== null ? axios
    .post(`${apiUrl}/lotlists-customers/create-customer`, customer)
    .then((res) => res): null;
     setSaved(true)
    
    return data;
  }
 
  const { data, error } = useQuery({
    queryKey: ["lotNumber"],
    queryFn: () => saveCustomer(customer),
     
  });
   if(isSaved){
    localStorage.removeItem("customer");
   }
  return (
    <>
      {error === null && data !==null? (
        <Typography fontSize="20px">Onnea arvontaan!</Typography>
      ) : (
        <Typography textColor="red">Jotain meni pieleen :(</Typography>
      )}

      <a href="/">Palaa</a>
    </>
  );
};

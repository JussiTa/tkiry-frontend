import { useQuery} from "@tanstack/react-query";
import { PaymentData } from "../../tkiry-backend/src/modules/interface";
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

 export type LotNumber = {
   lotNumber: object;
 };

export  function usePayment(): PaymentData | null {
  const {data } = useQuery<PaymentData>({
    queryKey: ["payments"],
     queryFn: () =>
      fetch(`${apiUrl}/paytrail/get-payments`).then((res) => res.json())
       
  });

  return data? data: null;
}


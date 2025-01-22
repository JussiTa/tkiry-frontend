import { useQuery } from "@tanstack/react-query";
import { PaymentData } from "../../tkiry-backend/src/modules/interface";
import axios from "axios";
import { Customer } from "./features/api/types";
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

export type LotNumber = {
  lotNumber: object;
};

export function usePayment(customer: Customer): PaymentData | null {
  const { data } = useQuery<PaymentData>({
    queryKey: ["payments"],
    queryFn: async () =>
      await axios
        .post(`${apiUrl}/paytrail/get-payments`, customer)
        .then((res) => res.data),
  });

  return data ? data : null;
}

import { useQuery } from "@tanstack/react-query";
import { Customer } from "../features/api/types";
import { PaymentData } from "../../../tkiry-backend/src/modules/interface";
import { Card } from "@mui/joy";
import { useEffect, useState } from "react";
import {usePayment} from '../fetchData'
// interface PayTrailProps {
// user: User;
// }
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;
export const Payments = () => {

  // const { data } = useQuery<PaymentData>({
  //   queryKey: ["lotNumbers"],
  //   queryFn: () =>
  //     fetch(`${apiUrl}/paytrail/get-payments`).then((res) => res.json()),
    
  // });
  const data =  usePayment()

  console.log(data)
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  

  useEffect(() => {
    const data = localStorage.getItem("customer");
    if (data !== null) {
      const customer = JSON.parse(data);
      setCurrentCustomer(customer);
     
     
    }
  
  }, []);

  console.log(currentCustomer);
  return (
    <>
      <div>
        <span>
          {" "}
          Valitsemalla maksutavan hyväksyt{" "}
          <a
            href="https://www.paytrail.com/kuluttaja/maksupalveluehdot"
            target="_blank"
          >
            maksupalveluehdot
          </a>{" "}
        </span>
      </div>
      <Card>
        {data?.providers.map((provider) => (
          <form method="POST" action={provider.url}>
            {provider.parameters.map((param) => (
              <input type="hidden" name={param.name} value={param.value} />
            ))}

            <button>
              <img src={provider.icon} />
            </button>
          </form>
        ))}
      </Card>
    </>
  );
};



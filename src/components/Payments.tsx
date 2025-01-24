import { Card } from "@mui/joy";
import { usePayment } from "../fetchData";
import { Customer } from "../features/api/types";
import { Suspense } from "react";

export const Payments = () => {
  const localStoreCustomer = localStorage.getItem("customer");

  const customer: Customer =
    localStoreCustomer !== null ? JSON.parse(localStoreCustomer) : null;

  const data = usePayment(customer);

  return (
    <>
      <div className="disclaimer">
        <span >
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
      <Suspense fallback={<span>Hetkinen...</span>}>
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
    </Suspense>
    </>
  );
};

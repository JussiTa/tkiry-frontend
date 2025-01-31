import { Card, Typography } from "@mui/joy";
import { usePayment } from "../fetchData";
import { Customer } from "../features/api/types";
import { Suspense } from "react";

export const Payments = () => {
  const localStoreCustomer = localStorage.getItem("customer");

  const customer: Customer =
    localStoreCustomer !== null ? JSON.parse(localStoreCustomer) : null;

  const { data } = usePayment(customer);
  //TODO add paytrail stamp to localstore to confirm on success pay right customer
  return (
    <>
      <div className="disclaimer">
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

      <Suspense fallback={<span>Hetkinen...</span>}>
        <Typography fontSize="25px">Valitse maksutapa</Typography>
        <Card>
          {data?.groups.map((group) => (
            <>
              <Typography fontWeight="1000">{group.name}</Typography>
              {data?.providers.map((provider) =>
                group.id === provider.group ? (
                  <form method="POST" action={provider.url}>
                    {provider.parameters.map((param) => (
                      <input
                        type="hidden"
                        name={param.name}
                        value={param.value}
                      />
                    ))}

                    <button>
                      <img src={provider.icon} />
                    </button>
                  </form>
                ) : null
              )}
            </>
          ))}
        </Card>
      </Suspense>
    </>
  );
};

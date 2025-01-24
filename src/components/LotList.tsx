import { useQuery } from "@tanstack/react-query";
import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
import {Sheet, Table, Typography } from "@mui/joy";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
import { useEffect } from "react";

type LotRow = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lotNumber: string;
};

export const LotListWithCustomer = () => {
  const { getLotListWithCustomers } = useLotlistCustomer();
  const { data } = useQuery({
    queryKey: ["lotNumbers"],
    queryFn: () =>
      getLotListWithCustomers()
        .then((res: unknown) => res)
        .catch(function (error) {
          console.log(error);
          return null;
        }),
  });


  const { me, isAuthenticated } = useAuthContext();

  useEffect(() => {
    me()
      .catch(() => {})
      .finally(() => {});
  }, []);

  const lotrows = Array.isArray(data)
    ? data.map((item) => {
        const lotRow: LotRow = {
          firstName: item["firstName"],
          lastName: item["lastName"],
          phoneNumber: item["phoneNumber"],
          lotNumber: item["lotNumber"],
        };
        return lotRow;
      })
    : null;

  return (
    <>
      {isAuthenticated ? (
        <Sheet>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th>Etunimi</th>
                <th>Sukunimi</th>
                <th>Puhellinnumero</th>
                <th>Arpanumero</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(lotrows)
                ? lotrows.map((item) => (
                    <tr key={item.lotNumber}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.lotNumber}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Sheet>
      ) : (
     
         <Typography fontSize="100px"textColor="red">401</Typography>
      )
      }
    
    </>
    
  );
};

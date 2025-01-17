import { useQuery } from "@tanstack/react-query";
import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
import { Sheet, Table } from "@mui/joy";

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

  // return data ? data : null;

  return (
    <Sheet>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Etunimi</th>
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
  );
};

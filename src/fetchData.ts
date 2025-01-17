import { useQuery} from "@tanstack/react-query";


 export type LotNumber = {
   lotNumber: object;
 };

export  function useLotNumber(): string[] | null {
  const {data } = useQuery<string[]>({
    queryKey: ["lotNumbers"],
     queryFn: () =>
      fetch("http://localhost:3000/lotlists-customers/get-all")
        .then((res) => res.json())
        .catch(function (error) {
          console.log(error);
          return null;
        })
  });

  return data? data: null;
}


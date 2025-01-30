import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "@mui/joy";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
import { Suspense, useEffect, useState } from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  section: {
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 10,
  },

  header: {
    width: 10,
    flexGrow: 1,
    borderTop: 2,
    borderBottom: 2,
    borderLeft: 1,
    borderRight: 1,
  },

  row: {
    width: 10,
    flexGrow: 1,
    borderTop: 1,
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
  },
});

type LotRow = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  lotNumber: string;
  address: string;
};

const stylesViewer = StyleSheet.create({
  viewer: {
    paddingTop:50,
    width: 1500,
    height: 800,
  },
});

export const ListDocument = () => {
  const { isAuthenticated, me } = useAuthContext();
  const [appIsLoading, setAppIsLoading] = useState(true);

  useEffect(() => {
    me()
      .catch(() => {})
      .finally(() => {setAppIsLoading(false)});
  }, []);

  const { getLotListWithCustomers } = useLotlistCustomer();
  const { data } = useSuspenseQuery({
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
          address: item["address"],
        };
        return lotRow;
      })
    : null;

   
    

  return (
    <>
   
      {isAuthenticated || appIsLoading? (
        <PDFViewer style={stylesViewer.viewer}>
          <Document>
            <Page wrap size="A4" orientation="landscape" style={styles.page}>
              <Text>
                {" "}
                Poliisihallituksen myöntämä keräyslupa nro. xxxxx.
                Kevätarpajaiset 2025
              </Text>
              <View style={styles.section}>
                <Text style={styles.header}> Nimi</Text>
                <Text style={styles.header}> Osoite</Text>
                <Text style={styles.header}> Puhelinnumero</Text>
                <Text style={styles.header}> Arpanumero</Text>
              </View>
              {lotrows?.map((item) => (
                <>
                  <View style={styles.section}>
                    <Text style={styles.row}>
                      {" "}
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.row}> {item.address}</Text>
                    <Text style={styles.row}> {item.phoneNumber}</Text>
                    <Text style={styles.row}> {item.lotNumber}</Text>
                  </View>
                </>
              ))}
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <Suspense fallback="Hetkinen...">
        <Typography fontSize="100px" textColor="red">
          401
        </Typography>
        </Suspense>
     
      )}
       
    </>
  );
};

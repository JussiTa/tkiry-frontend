import { BorderBottom } from "@mui/icons-material";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },

  section: {
    flexDirection: "row",
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
const data = [
  {
    name: "Person1",
    address: "Testikatu 2",
    phoneNumber: 12345,
    lotNumber: 1,
  },
  {
    name: "Person3",
    address: "Testikatu 3",
    phoneNumber: 12345,
    lotNumber: 2,
  },
  {
    name: "Person1",
    address: "Testikatu 2",
    phoneNumber: 12345,
    lotNumber: 3,
  },
  {
    name: "Person2",
    address: "Testikatu 1",
    phoneNumber: 12345,
    lotNumber: 4,
  },
];

export const ListDocument = () => (
  <Document>
    <Page wrap size="A4" orientation="landscape" style={styles.page}>
      <Text fixed>
        Poliisihallituksen myöntämä keräyslupa nro. xxxxx. Kevätarpajaiset 2025
      </Text>
      <View style={styles.section}>
        <Text style={styles.header}>Nimi</Text>
        <Text style={styles.header}>Osoite</Text>
        <Text style={styles.header}>Puhelinnumero</Text>
        <Text style={styles.header}>Arpanumero</Text>
      </View>
      {data.map((item) => (
        <>
          <View style={styles.section}>
            <Text style={styles.row}>{item.name}</Text>
            <Text style={styles.row}>{item.address}</Text>
            <Text style={styles.row}>{item.phoneNumber}</Text>
            <Text style={styles.row}>{item.lotNumber}</Text>
          </View>
        </>
      ))}
      ;
    </Page>
  </Document>
);

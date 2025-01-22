import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
export const Success = () => {
  const localStorageCustomer = localStorage.getItem("customer");
  const customer =
    localStorageCustomer !== null ? JSON.parse(localStorageCustomer) : null;
  const {addCustomer} = useLotlistCustomer();
  addCustomer(customer)

  localStorage.removeItem('customer');
  
  return <span>"Onnea arvontaan"</span>;
};

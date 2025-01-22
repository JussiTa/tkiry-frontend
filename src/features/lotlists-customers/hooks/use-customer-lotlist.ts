import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { routes } from "../../api/constants/constants";
import { ApiMethod } from "../../api/types";
import type { LotList, Customer } from "../../api/types";

export const useLotlistCustomer = () => {
  const { sendAuthGuardedRequest } = useAuthContext();

  const createLotList = async (lotList: LotList): Promise<unknown> => {
    return sendAuthGuardedRequest(
      ApiMethod.POST,
      routes.lotListsCustomers.createList,
      lotList
    );
  };

  const addCustomer = async (customer: Customer): Promise<unknown> => {
    return sendAuthGuardedRequest(
      ApiMethod.POST,
      routes.lotListsCustomers.addCustomer,
      customer
    );
  };

  const getLotList = async (): Promise<unknown> => {
    return await sendAuthGuardedRequest(
      ApiMethod.GET,
      routes.lotListsCustomers.getLotList
    );
  };

  const getLotListWithCustomers = async (): Promise<unknown> => {
    return await sendAuthGuardedRequest(
      ApiMethod.GET,
      routes.lotListsCustomers.getLotListWithCustomers
    );
  };

  return { createLotList, getLotList, addCustomer, getLotListWithCustomers };
};

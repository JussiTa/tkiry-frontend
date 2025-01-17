export const routes = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    refreshTokens: "/auth/refresh-tokens",
        clearAuthCookie: "auth/clearAuthCookie"
  },
  // user: {
  //   findAll: "/user",
  //   findOne: (id: number) => `/user/${id}`,
  // },
  lotListsCustomers: {
    createList: "/lotlists-customers/create-list",
    addCustomer: "/lotlists-customers/create-customer",
    getLotList: "/lotlists-customers/get-all",
    getLotListWithCustomers: "/lotlists-customers/get-all-customers",

    
  },
};

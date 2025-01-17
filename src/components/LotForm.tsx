import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Inputs,
  InputSchema,
  SelectedNumbers,
  User,
} from "../features/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
import ReactSelect from "react-select";
import { Card, Grid } from "@mui/joy";
import { FormField } from "./FormField";
import { Success } from "./Success";

export const LotForm = () => {
  const { getLotList, addCustomer } = useLotlistCustomer();
  const [appIsLoading, setAppIsLoading] = useState(true);
  const { me } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["lotnumbers"],
    queryFn: getLotList,
  });

  const options = Array.isArray(data)
    ? data.map((item) => {
        const option: SelectedNumbers = {
          value: item,
          label: item,
        };

        return option;
      })
    : [];

  const mutation = useMutation({
    mutationFn: async (neUser: User) => {
      return await addCustomer(neUser);
    },
  });





  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputSchema) });
  //
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      postalCode: data.postalCode,
      phoneNumber: data.phoneNumber,
      lotNumber: data.lotNumber,
    };

    mutation.mutate(user);
  };

  useEffect(() => {
    me()
      .catch(() => {})
      .finally(() => setAppIsLoading(false));
  }, []);

  if (appIsLoading) {
    return <div>Loading...</div>;
  }

  if (mutation.isSuccess) {
    return (
    <Success />);
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type="text"
          placeHolder="Etunimi"
          name="firstName"
          register={register}
          error={errors.firstName}
        />

        <FormField
          type="text"
          placeHolder="Sukunimi"
          name="lastName"
          register={register}
          error={errors.lastName}
        />

        <FormField
          type="text"
          placeHolder="Osoite"
          name="address"
          register={register}
          error={errors.address}
        />
        <FormField
          type="text"
          placeHolder="Postinumero"
          name="postalCode"
          register={register}
          error={errors.postalCode}
          valueAsNumber
        />

        <FormField
          type="text"
          placeHolder="Puhelinnumero"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
        />

        <Grid xs={4} md={10}>
          <label>Valitse listalta numero(t) </label>
          <Controller
            control={control}
            name="lotNumber"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <ReactSelect
                isMulti
                options={options}
                placeholder="Valitse lottonumero "
                onChange={onChange}
              />
            )}
          />
        </Grid>

        <Grid xs={6} md={10}>
          <button className="submit-button" type="submit">
            {" "}
            Osallistu arvontaan
          </button>
        </Grid>
      </form>
    </Card>
  );
};

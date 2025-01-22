import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Inputs,
  InputSchema,
  SelectedNumbers,
  Customer,
} from "../features/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import ReactSelect from "react-select";
import { Card, Grid } from "@mui/joy";
import { FormField } from "./FormField";

import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;
let totalLots = 0;
let totalSum = 0;

export const LotForm = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["lotNumbers"],
    queryFn: () =>
      fetch(`${apiUrl}/lotlists-customers/get-all`).then((res) => res.json()),
  });

  const options = Array.isArray(data)
    ? data.map((item) => {
        const option: SelectedNumbers = {
          value: item["lotNumber"],
          label: item["lotNumber"],
        };

        return option;
      })
    : [];

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(InputSchema) });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const customer: Customer = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      lotNumber: formData.lotNumber,
      totalAmount: formData.lotNumber.length * data[0]["unitPrice"],
      email: formData.email.replace(' ',''),
    };
    localStorage.setItem("customer", JSON.stringify(customer));
    navigate("/payments", { replace: true });
  };

  const watchedLotNumbers = watch().lotNumber;

  if (watchedLotNumbers !== undefined) {
    totalLots = watchedLotNumbers.length;
    totalSum = totalLots * data[0]["unitPrice"];
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
        <FormField
          type="text"
          placeHolder="Säköpostiosoite"
          name="email"
          register={register}
          error={errors.email}
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
            Siirry maksamaan
          </button>
        </Grid>
      </form>
      <div>
        Olet varannut {totalLots.toString()} arpaa yht. {totalSum}€
      </div>
    </Card>
  );
};

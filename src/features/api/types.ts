import { z } from "zod";

export enum ApiMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type QueryParam = {
  key: string;
  value: string;
};

export type LotList = {
  title: string;
  startDate: string;
  endDate: string;
};

export type Customer = {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  phoneNumber: string;
  lotNumber: SelectedNumbers[];
  totalAmount: number;
  email: string;
};

export type SelectedNumbers = {
  value: number;
  label: string;
};

export type Inputs = {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  phoneNumber: string;
  lotNumber: SelectedNumbers[];
  email: string;
};

const endOfEmail = /@\w+\.fi|@\w+\.net|@\w+\.com/;

export const InputSchema = z.object({
  firstName: z.string().nonempty({ message: "Etunimi vaaditaan" }),
  lastName: z.string().min(1, "Sukunimi vaaditaan"),
  address: z.string().min(1, "Osoite vaaditaan"),
  postalCode: z.number({ message: "Anna postinumero oikeassa muodossa" }),
  lotNumber: z.any(),
  phoneNumber: z.string().min(1, "Puhelinnumero vaaditaan"),
  email: z.string().refine((val) => val.match(endOfEmail) ,{
    message: "Tarkista emailin oikeellisuus",
   })
});

type InputSchema = z.infer<typeof InputSchema>;



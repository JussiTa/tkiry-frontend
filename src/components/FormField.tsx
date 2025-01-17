import { FieldError, UseFormRegister } from "react-hook-form";
import { Inputs } from "../features/api/types";
import { Grid } from "@mui/joy";

type ValidFieldNames =
  | "firstName"
  | "lastName"
  | "address"
  | "postalCode"
  | "phoneNumber"
  | "lotNumber";

interface FormFieldProps {
  type: string;
  placeHolder: string;
  name: ValidFieldNames;
  register: UseFormRegister<Inputs>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  placeHolder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  return (
    <>
      <Grid xs={4} md={3}>
        <input
          type={type}
          placeholder={placeHolder}
          {...register(name, { valueAsNumber })}
        />
      </Grid>
      <Grid xs={4} md={3}>
        {error && <span className="error-message">{error.message}</span>}
      </Grid>
    </>
  );
};

export default FormField;

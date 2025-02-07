"use client";
import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles({
  card: {
    width: "35%",
    margin: "0 auto",
    marginTop: "50px",
    padding: "50px",
    border: "2px solid #0000008f",
    borderRadius: "50px",
  },
  inputTitle: {
    display: "flex",
    width: "100%",
    marginBottom: "20px",
  },
  formLabel: {
    fontSize: "20px",
    width: "50%",
  },
  errorsText: {
    color: "red",
  },
});

const eighteenYearsAgo = dayjs().subtract(18, "year");

interface IFormInput {
  firstName: string;
  age: number;
  select: string;
}

export default function Home() {
  const classes = useStyles();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  return (
    <Box className={classes.card}>
      <Box sx={{ width: 500 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.inputTitle}>
            <FormLabel className={classes.formLabel}>Title</FormLabel>
            <Select
              displayEmpty
              fullWidth
              required
              inputProps={{ "aria-label": "Without label" }}
              {...register("select", {
                required: true,
              })}
            >
              <MenuItem value={"Mr"}>Mr.</MenuItem>
              <MenuItem value={"Mrs"}>Mrs.</MenuItem>
              <MenuItem value={"Miss"}>Miss</MenuItem>
            </Select>
            {errors?.select?.type === "required" && (
                <p className={classes.errorsText}>This field is required</p>
              )}
          </Box>
          <Box className={classes.inputTitle}>
            <FormLabel className={classes.formLabel}>Name</FormLabel>
            <Box sx={{ width: "500px" }}>
              <TextField
                id="standard-basic"
                fullWidth
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 15,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors?.firstName?.type === "required" && (
                <p className={classes.errorsText}>This field is required</p>
              )}
              {errors?.firstName?.type === "minLength" && (
                <p className={classes.errorsText}>
                  First name cannot exceed 2 characters
                </p>
              )}
              {errors?.firstName?.type === "maxLength" && (
                <p className={classes.errorsText}>
                  First name maxLength 15 characters
                </p>
              )}
              {errors?.firstName?.type === "pattern" && (
                <p className={classes.errorsText}>
                  Alphabetical characters only
                </p>
              )}
            </Box>
          </Box>
          <Box className={classes.inputTitle}>
            <FormLabel className={classes.formLabel}>Birth Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="birthDate"
                control={control}
                rules={{ required: "Birth date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                sx={{ width: "500px" }}

                    maxDate={eighteenYearsAgo}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        error: !!errors.birthDate,
                        helperText: errors.birthDate?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
            <Button variant="outlined" sx={{ marginLeft: "180px" }}>
              <CancelIcon />
            </Button>
            <Button variant="outlined">Add</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

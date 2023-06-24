import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { z } from "zod";
import React from 'react'
import { CircularProgress } from "@mui/material";
import { useForgotPassword } from "../../Hooks/Auth/useForgotPassword";

type Props = {}
const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordForm = (props: Props) => {

  let {forgotPassword, error, data, isError, isLoading, isSuccess} = useForgotPassword()

  // let isSuccess = false
  // let isLoading = false

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    // console.log(data);
    forgotPassword(data)
  };

  return (
<Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 5,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // Box shadow style
        marginX:3
        // boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Box shadow style
      }}
    >


{isLoading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: 200,
					}}
				>
					<CircularProgress />
				</Box>
			)}
    
    {!isLoading && !isSuccess && (<form onSubmit={handleSubmit(onSubmit)}>
    <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
    <Typography variant="body1" align="center" gutterBottom>
          Enter the email associated with the account
        </Typography>

        <Box marginBottom={2}>
          <Typography>Email</Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
    </form>)}

    {isSuccess && !isLoading && (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					textAlign="center"
				>
					<Typography variant="h6" sx={{ padding: 5 }}>
          {data.msg}
					</Typography>
					

					
				</Box>
			)}
    </Container>  )
}

export default ForgotPasswordForm
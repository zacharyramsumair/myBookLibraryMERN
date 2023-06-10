import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./Contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UserContextProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<App />
          <ToastContainer />
				</ThemeProvider>
			</QueryClientProvider>
		</UserContextProvider>
	</React.StrictMode>
);

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import UserSettingsPage from "./Pages/UserSettingsPage";

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Router>
				{/* <Container maxWidth="sm"> */}
				<Routes>
					<Route path="/" element={<UserSettingsPage />} />
					<Route path="/home" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
				{/* </Container> */}
			</Router>
		</React.Fragment>
	);
}

export default App;

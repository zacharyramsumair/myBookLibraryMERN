import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavbarLandingPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import React from "react";

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Router>
				<Navbar />
				{/* <Container maxWidth="sm"> */}
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
				{/* </Container> */}
			</Router>
		</React.Fragment>
	);
}

export default App;

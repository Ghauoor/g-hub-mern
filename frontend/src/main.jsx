<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
=======
import { StrictMode } from "react";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
>>>>>>> 0397f0d (clean all the imports)

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);

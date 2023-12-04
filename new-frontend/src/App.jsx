import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/login/Login.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Register from "./pages/login/Register.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import ResetPW from "./pages/login/ResetPW.jsx";
import Admin from "./pages/users/Admin.jsx";
import Patient from "./pages/users/Patient.jsx";
import Doctor from "./pages/users/Doctor.jsx";

import Store from "./redux/Store.jsx";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d6efd",
    },
    secondary: {
      main: "#198754",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

const App = () => {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<ResetPW />} />
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/patient/home" element={<Patient />} />
              <Route path="/doctor/home" element={<Doctor />} />
            </Routes>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

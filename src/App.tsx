import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./app/routerUtils/PrivateRoute";
import Dashboard from "./app/components/dashboard/Dashboard";
import Login from "./app/components/login/Login";
import "./App.css";
import Navbar from "./app/components/navbar/Navbar";
import { ThemeProvider } from "styled-components";
import { Container } from "./app/components/styled/Container";
import GlobalStyles from "./app/components/styled/Global";

const theme = {
  colors: {
    header: "#765eb1",
    body: "#fff",
    footer: "#003333",
  },
  mobile: "768px",
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />

      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* the PrivateRoute restrict the Routes to work just if the user is logged in*/}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/*" element={<Navigate replace to="/dashboard" />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;

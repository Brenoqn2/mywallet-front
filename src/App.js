import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import "./reset.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TransactionsPage from "./components/TransactionsPage";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [emailLogin, setEmailLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [nameR, setNameR] = useState();
  const [emailR, setEmailR] = useState();
  const [passwordR, setPasswordR] = useState();
  const [repeatPasswordR, setRepeatPasswordR] = useState();
  const [username, setUsername] = useState();
  const [bearer, setBearer] = useState();
  const [transactions, setTransactions] = useState();
  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        emailLogin,
        setEmailLogin,
        passwordLogin,
        setPasswordLogin,
        nameR,
        setNameR,
        emailR,
        setEmailR,
        passwordR,
        setPasswordR,
        repeatPasswordR,
        setRepeatPasswordR,
        bearer,
        setBearer,
        username,
        setUsername,
        transactions,
        setTransactions,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import React from "react";
import { Form, Input, Button, Spinner } from "./LoginPage";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";

export default function NewTransaction() {
  const { newTransaction, loading, bearer, emailLogin, setLoading } =
    useContext(UserContext);
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  const navigate = useNavigate();

  async function saveNewTransaction(e) {
    e.preventDefault();
    setLoading(true);
    const day = String(dayjs().date()).padStart(2, "0");
    const month = String(dayjs().month() + 1).padStart(2, "0");
    const date = `${day}/${month}`;

    let amountFormatted = parseFloat(amount).toFixed(2);
    amountFormatted = amountFormatted.replace(".", ",");

    const isIncome = newTransaction === "income" ? true : false;

    const data = {
      date: date,
      description: description,
      amount: amountFormatted,
      isIncome: isIncome,
    };

    const config = {
      headers: {
        authorization: `Bearer ${bearer}`,
        user: emailLogin,
      },
    };

    const URL = `http://localhost:5000/transactions`;

    try {
      await axios.post(URL, data, config);
      setLoading(false);
      navigate("/transactions");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  return (
    <Main>
      <H1>{newTransaction === "income" ? "Nova entrada" : "Nova saída"}</H1>
      <Div>
        <Form onSubmit={(e) => saveNewTransaction(e)}>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            background={loading ? "#F2F2F2" : "white"}
            color={loading ? "#AFAFAF" : "black"}
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor"
            type="number"
          ></Input>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            background={loading ? "#F2F2F2" : "white"}
            color={loading ? "#AFAFAF" : "black"}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Descrição"}
          ></Input>
          <Button>
            {loading ? (
              <Spinner>
                <ThreeDots color="white" height="45px" width="50px" />
              </Spinner>
            ) : newTransaction === "income" ? (
              "Salvar entrada"
            ) : (
              "Salvar saída"
            )}
          </Button>
        </Form>
      </Div>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #8c11be;
  height: 100vh;
`;

const H1 = styled.h1`
  width: 90%;
  margin: 0 auto;
  margin-top: 26px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
`;

const Div = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 16px;
`;

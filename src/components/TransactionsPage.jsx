import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import React from "react";
import Transactions from "./Transactions";

export default function TransactionsPage() {
  const {
    username,
    bearer,
    emailLogin,
    transactions,
    setTransactions,
    setNewTransaction,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${bearer}`,
        user: emailLogin,
      },
    };
    const URL = `https://back-my-wallet-brenoqn2.herokuapp.com/transactions`;
    const promise = axios.get(URL, config);
    promise.then((response) => {
      setTransactions(response.data);
    });
    promise.catch((e) => {
      console.log(e);
      navigate("/");
    });
  }, [bearer, emailLogin, setTransactions, navigate]);

  function newTransaction(newTransaction) {
    setNewTransaction(newTransaction);
    navigate("/new-transaction");
  }

  async function logOut() {
    const URL = `https://back-my-wallet-brenoqn2.herokuapp.com/log-out`;
    const config = {
      headers: {
        authorization: `Bearer ${bearer}`,
        user: emailLogin,
      },
    };
    try {
      await axios.delete(URL, config);
      setTransactions([]);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Main>
      <Div>
        <Welcome>{`Olá, ${username}`}</Welcome>
        <ion-icon name="exit-outline" onClick={logOut}></ion-icon>
      </Div>
      <TransactionsBackground
        justify={transactions.length === 0 ? "center" : ""}
      >
        {transactions.length === 0 ? (
          <Warning>Não há registros de entrada ou saída</Warning>
        ) : (
          <Transactions></Transactions>
        )}
      </TransactionsBackground>
      <ButtonsWrapper>
        <Button onClick={() => newTransaction("income")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </Button>
        <Button onClick={() => newTransaction("expense")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saída</p>
        </Button>
      </ButtonsWrapper>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #8c11be;
  height: 100vh;
`;

const Div = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  ion-icon {
    font-size: 28px;
    color: white;
  }
`;

const Welcome = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
`;

const TransactionsBackground = styled.div`
  background: white;
  border-radius: 5px;
  height: 70vh;
  width: 90%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  overflow: auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 114px;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  margin-bottom: 16px;
`;

const Button = styled.div`
  width: 155px;
  height: 114px;
  position: relative;

  background: #a328d6;
  border-radius: 5px;

  :first-of-type {
    margin-right: 10px;
  }
  p {
    position: absolute;
    width: 64px;
    height: 40px;
    left: 10px;
    bottom: 10px;

    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #ffffff;
  }
  ion-icon {
    position: absolute;
    font-size: 22px;
    left: 10px;
    top: 10px;
    color: white;
  }
`;

const Warning = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  width: 180px;
  height: 46px;
  margin: 0 auto;
  color: #868686;
`;

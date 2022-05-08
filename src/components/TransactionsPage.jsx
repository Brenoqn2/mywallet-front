import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import React from "react";

export default function TransactionsPage() {
  const { username } = useContext(UserContext);
  return (
    <Main>
      <Div>
        <Welcome>{`Olá, ${username}`}</Welcome>
      </Div>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #8c11be;
  height: 100vh;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 90%;
`;

const Welcome = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;

  color: #ffffff;
`;

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

export default function LoginPage() {
  const {
    loading,
    setLoading,
    emailLogin,
    setEmailLogin,
    passwordLogin,
    setPasswordLogin,
    setBearer,
    setUsername,
  } = useContext(UserContext);
  const URL = "http://localhost:5000/sign-in";
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(URL, {
        email: emailLogin,
        password: passwordLogin,
      });
      await setBearer(response.data.token);
      await setUsername(response.data.username);
      await setLoading(false);
      navigate("/transactions");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Main>
      <Div>
        <H1>MyWallet</H1>
        <Form onSubmit={(e) => login(e)}>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            background={loading ? "#F2F2F2" : "white"}
            color={loading ? "#AFAFAF" : "black"}
            type="email"
            placeholder="E-mail"
            value={emailLogin || ""}
            onChange={(e) => setEmailLogin(e.target.value)}
          ></Input>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            color={loading ? "#AFAFAF" : "black"}
            background={loading ? "#F2F2F2" : "white"}
            type="password"
            placeholder="Senha"
            value={passwordLogin || ""}
            onChange={(e) => setPasswordLogin(e.target.value)}
          ></Input>
          <Button type="submit">
            {loading ? (
              <Spinner>
                <ThreeDots color="white" height="45px" width="50px" />
              </Spinner>
            ) : (
              "Entrar"
            )}
          </Button>
        </Form>
        <Link to="/sign-up" style={{ textDecoration: "none" }}>
          <P>Primeira vez? Cadastre-se!</P>
        </Link>
      </Div>
    </Main>
  );
}

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #8c11be;
  height: 100vh;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 90%;
`;

export const H1 = styled.h1`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;

  color: #ffffff;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 24px;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.background};
  height: 58px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: ${(props) => props.color};
  padding-left: 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  pointer-events: ${(props) => props.pointer};
  margin-bottom: 13px;
  ::placeholder {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #6b6b6b;
  }
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  background: #a328d6;
  border: none;
  outline: none;
  height: 46px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #ffffff;
`;

export const Spinner = styled.div`
  width: 100%;
  height: 45px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
  }
`;

export const P = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  margin-top: 36px;
`;

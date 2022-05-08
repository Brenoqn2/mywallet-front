import { Link, useNavigate } from "react-router-dom";
import { Main, Div, H1, Form, Input, Button, Spinner, P } from "./LoginPage";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import React from "react";

export default function LoginPage() {
  const {
    loading,
    setLoading,
    nameR,
    setNameR,
    emailR,
    setEmailR,
    passwordR,
    setPasswordR,
    repeatPasswordR,
    setRepeatPasswordR,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const URL = "http://localhost:5000/sign-up";
  async function register(e) {
    e.preventDefault();
    setLoading(true);
    if (repeatPasswordR !== passwordR) return alert("As senhas não coincidem!");
    try {
      await axios.post(URL, {
        user: nameR,
        email: emailR,
        password: passwordR,
        repeatPassword: repeatPasswordR,
      });
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Main>
      <Div>
        <H1>MyWallet</H1>
        <Form onSubmit={(e) => register(e)}>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            color={loading ? "#AFAFAF" : "black"}
            background={loading ? "#F2F2F2" : "white"}
            type="text"
            placeholder="Nome"
            value={nameR || ""}
            onChange={(e) => setNameR(e.target.value)}
          ></Input>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            color={loading ? "#AFAFAF" : "black"}
            background={loading ? "#F2F2F2" : "white"}
            type="email"
            placeholder="E-mail"
            value={emailR || ""}
            onChange={(e) => setEmailR(e.target.value)}
          ></Input>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            color={loading ? "#AFAFAF" : "black"}
            background={loading ? "#F2F2F2" : "white"}
            type="password"
            placeholder="Senha"
            value={passwordR || ""}
            onChange={(e) => setPasswordR(e.target.value)}
          ></Input>
          <Input
            pointer={loading ? "none" : "auto"}
            opacity={loading ? "0.7" : "1"}
            color={loading ? "#AFAFAF" : "black"}
            background={loading ? "#F2F2F2" : "white"}
            type="password"
            placeholder="Confirme a senha"
            value={repeatPasswordR || ""}
            onChange={(e) => setRepeatPasswordR(e.target.value)}
          ></Input>
          <Button type="submit">
            {loading ? (
              <Spinner>
                <ThreeDots color="white" height="45px" width="50px" />
              </Spinner>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Form>
        <Link to="/" style={{ textDecoration: "none" }}>
          <P>Já tem uma conta? Entre agora!</P>
        </Link>
      </Div>
    </Main>
  );
}

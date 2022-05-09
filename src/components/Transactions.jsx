import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
export default function Transactions() {
  const { transactions } = useContext(UserContext);
  const transactionsReverse = transactions.reverse();
  function sumTransactions() {
    let sum = 0;
    transactions.forEach((transaction) => {
      if (transaction.isIncome === true) {
        sum += Number(transaction.amount.replace(",", "."));
      } else {
        sum -= Number(transaction.amount.replace(",", "."));
      }
    });
    return sum.toFixed(2);
  }
  const balance = sumTransactions();
  return (
    <>
      <TransactionsContainer>
        {transactionsReverse.map((transaction) => {
          return (
            <Container key={transactionsReverse.indexOf(transaction)}>
              <div>
                <Date>{transaction.date}</Date>
                <Description>{transaction.description}</Description>
              </div>
              <Balance color={transaction.isIncome ? "#03AC00" : "#C70000"}>
                {transaction.amount}
              </Balance>
            </Container>
          );
        })}
      </TransactionsContainer>
      <Footer>
        <div>
          <p>SALDO</p>
          <Balance color={balance >= 0 ? "#03AC00" : "#C70000"}>
            {String(balance).replace("-", "")}
          </Balance>
        </div>
      </Footer>
    </>
  );
}

const TransactionsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100% - 50px);
`;

const Footer = styled.footer`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;

  div {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p:first-of-type {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
  }
`;

const Balance = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: ${(props) => props.color};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  :last-of-type {
    margin-bottom: 20px;
  }

  div {
    display: flex;
  }
`;

const Date = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #c6c6c6;
`;

const Description = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 20px;
`;

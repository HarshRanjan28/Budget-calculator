import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    console.log("called");

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //add charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //add setAmount
  const handleAmount = (e) => {
    let amount = e.target.value;
    if (amount === "") {
      setAmount(amount);
    } else {
      setAmount(parseInt(amount));
    }
  };
  ////handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpense);
        setEdit(false);
      } else {
        const newExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, newExpense]);
        setAmount("");
        setCharge("");
        handleAlert({ type: "success", text: "item added" });
      }
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };
  //clear all items
  const clearItems = () => {
    setExpenses([]);
  };
  //clear particular item
  const handleDelete = (id) => {
    const updateList = expenses.filter((item) => item.id !== id);
    setExpenses(updateList);
    handleAlert({ type: "danger", text: `item deleted` });
  };
  //edit particular item
  const handleEdit = (id) => {
    let expense = expenses.find((item) => {
      return item.id === id;
    });
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          handleSubmit={handleSubmit}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          edit={edit}
        />
        {/*<Alert />*/}
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total Spending :
        <span className="total">
          $
          {expenses.reduce((accum, curr) => {
            return (accum += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;

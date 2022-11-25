import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, clearItems, handleDelete, handleEdit }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear expenses
          <i class="fa-solid fa-trash"></i>
        </button>
      )}
    </>
  );
};

export default ExpenseList;

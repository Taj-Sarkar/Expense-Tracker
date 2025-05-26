//⏭️⏭️⏭️ Project : Expense Tracker

import { useState } from "react";
import ExpenseList from "./Components/Expense-tracker/Exp-Components/ExpenseList";
import ExpenseFilter from "./Components/Expense-tracker/Exp-Components/ExpenseFilter";
import ExpenseForm from "./Components/Expense-tracker/Exp-Components/ExpenseForm";

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const visibleExpense = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Expense Tracker</h1>

      <div className="row g-4">
        {/* Form */}
        <div className="col-md-6 mx-auto">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h4 className="mb-3 text-primary">Add New Expense</h4>
            <ExpenseForm
              onSubmit={(expense) => {
                setExpenses([
                  ...expenses,
                  { ...expense, id: expenses.length + 1 },
                ]);
              }}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="col-md-6 mx-auto">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>

        {/* List */}
        <div className="col-12">
          {visibleExpense.length === 0 ? (
            <p className="text-center text-muted">No expenses to show.</p>
          ) : (
            <ExpenseList
              expenses={visibleExpense}
              onDelete={(id) =>
                setExpenses(expenses.filter((e) => e.id !== id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

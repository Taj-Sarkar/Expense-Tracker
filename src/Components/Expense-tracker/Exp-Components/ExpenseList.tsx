//⏭️⏭️⏭️ Project : Expense Tracker

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0)
    return <p className="text-center text-muted mt-4">No expenses found.</p>;

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-primary">
          <tr>
            <th>Description</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-light fw-bold">
          <tr>
            <td>Total</td>
            <td>${total.toFixed(2)}</td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;

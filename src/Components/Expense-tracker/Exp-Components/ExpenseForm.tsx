//⏭️⏭️⏭️ Project : Expense Tracker

interface Props {
  onSubmit: (data: FormData) => void;
}

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Should contain at least 3 characters" })
    .max(50, { message: "Character count exceeded" }),
  amount: z
    .number({ invalid_type_error: "This field is required" })
    .min(1, { message: "Amount should be at least $1" })
    .max(100_000, { message: "Amount cap exceeded" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type FormData = z.infer<typeof schema>;

const Forms = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="p-4 border rounded shadow-sm bg-light"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label fw-bold">
          Amount ($)
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className={`form-control ${errors.amount ? "is-invalid" : ""}`}
        />
        {errors.amount && (
          <div className="invalid-feedback">{errors.amount.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="form-label fw-bold">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className={`form-select ${errors.category ? "is-invalid" : ""}`}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className="invalid-feedback">{errors.category.message}</div>
        )}
      </div>

      <button className="btn btn-success w-100" type="submit">
        Add Expense
      </button>
    </form>
  );
};

export default Forms;

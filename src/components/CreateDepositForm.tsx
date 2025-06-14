import React, { useState } from "react";
import axios from "axios";

const CreateDepositForm = () => {
    const [form, setForm] = useState({
        date: "",
        amount: "",
        currency: "",
        description: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange =
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.date) newErrors.date = "Date is required.";
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = "Amount must be > 0.";
        if (!form.currency) newErrors.currency = "Currency is required.";
        if (!form.description) newErrors.description = "Description is required.";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_API_BASE_URL
            const depositsIn = process.env.REACT_APP_API_DEPOSITS_URL;
            const response = await axios.post(`${apiUrl}${depositsIn}`, {
                date: form.date,
                amount: parseFloat(form.amount),
                currency: form.currency,
                description: form.description,
            });

            setMessage("Deposit created successfully!");
            setForm({ date: "", amount: "", currency: "", description: "" });
        } catch (error: any) {
            setMessage("Failed to create deposit. Please try again.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
            <h2>Create Deposit</h2>

            <div className="mb-3">
                <label htmlFor="date" className="form-label">Deposit Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className={`form-control ${errors.date ? "is-invalid" : ""}`}
                    value={form.date}
                    onChange={handleChange}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                    type="number"
                    min="0"
                    id="amount"
                    name="amount"
                    className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                    value={form.amount}
                    onChange={handleChange}
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="currency" className="form-label">Currency</label>
                <select
                    id="currency"
                    name="currency"
                    className={`form-select ${errors.currency ? "is-invalid" : ""}`}
                    value={form.currency}
                    onChange={handleChange}
                >
                    <option value="">Select currency</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    {/* Add more currencies as needed */}
                </select>
                {errors.currency && <div className="invalid-feedback">{errors.currency}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    style={{ resize: "vertical" }}
                />

                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit Deposit</button>

            { message && <div className="mt-3 alert alert-info">{message}</div> }
        </form>
    );
};

export default CreateDepositForm;

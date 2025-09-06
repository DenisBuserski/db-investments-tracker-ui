import React, { useState } from "react";
import axios from "axios";

type DepositWithdrawalFormProps = {
    type: "deposit" | "withdrawal";
    onSubmitSuccess?: () => void;
};

const DepositWithdrawalForm: React.FC<DepositWithdrawalFormProps> = ({ type, onSubmitSuccess }) => {
    const [form, setForm] = useState({
        date: "",
        amount: "",
        currency: "",
        description: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [messageInfo, setMessageInfo] = useState<{ text: string; type: 'success' | 'error' } | null>(null);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
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
            const apiUrl = process.env.REACT_APP_API_BASE_URL;
            const depositsIn = process.env.REACT_APP_API_DEPOSIT_URL;
            const withdrawalsOut = process.env.REACT_APP_API_WITHDRAWAL_URL;
            const endpoint = type === "deposit" ? `${depositsIn}` : `${withdrawalsOut}`;

            await axios.post(`${apiUrl}${endpoint}`, {
                date: form.date,
                amount: parseFloat(form.amount),
                currency: form.currency,
                description: form.description,
            });

            setMessageInfo({ text: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`, type: 'success' });
            setForm({ date: "", amount: "", currency: "", description: "" });
            if(onSubmitSuccess) onSubmitSuccess();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                let backendMessage: string | null = null;


                if (errorData && typeof errorData === "object") {
                    if ("detail" in errorData && typeof errorData.detail === "string") {
                        // Standard ProblemDetail field
                        backendMessage = errorData.detail;
                    } else if ("message" in errorData && typeof errorData.message === "string") {
                        // Custom error field (your BadRequestException handler)
                        backendMessage = errorData.message;
                    } else if ("error" in errorData && typeof errorData.error === "string") {
                        // Fallback for generic "error" property
                        backendMessage = errorData.error;
                    } else if ("errors" in errorData && Array.isArray(errorData.errors)) {
                        // Validation handler returns multiple messages
                        backendMessage = errorData.errors.join(", ");
                    } else if ("title" in errorData && typeof errorData.title === "string") {
                        // Fall back to title if nothing else
                        backendMessage = errorData.title;
                    }
                }


                setMessageInfo({
                    text: `Failed to create ${type}: ${backendMessage ?? "Unknown error from server"}`,
                    type: "error",
                });
            } else {
                setMessageInfo({
                    text: `Failed to create ${type}. Unexpected error occurred.`,
                    type: "error",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
            <h2>Create {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
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
                <label htmlFor="description" className="form-label">
                    Description <small className="text-muted">(optional)</small>
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    style={{ resize: "vertical" }}
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            {messageInfo && (
                <div className={`mt-3 alert ${messageInfo.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {messageInfo.text}
                </div>
            )}
        </form>
    );
};

export default DepositWithdrawalForm;

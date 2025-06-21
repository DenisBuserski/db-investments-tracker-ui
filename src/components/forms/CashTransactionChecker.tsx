import React, { useState } from "react";
import axios from "axios";

const CashTransactionChecker = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [type, setType] = useState("Select");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchTransactions = () => {
        if (type === "Select") {
            setError("Please select a transaction type.");
            return; // Prevent the API call
        }

        setLoading(true);
        setError(null);

        const params: any = {};

        if (type !== "Select") params.CashTransactionType = type;
        if (fromDate) params.fromDate = fromDate;
        if (toDate) params.toDate = toDate;

        const apiUrl = process.env.REACT_APP_API_BASE_CASH_TRANSACTIONS_URL;
        axios.get(`${apiUrl}/get`, { params })
            .then((res) => {
                setTransactions(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API error:", err);
                setError("Failed to fetch cash transactions.");
                setLoading(false);
            });
    };

    const inputStyle: React.CSSProperties = {
        fontSize: "1.1rem",
        padding: "0.5rem 0.75rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        minWidth: "160px",
        height: "40px",
        boxSizing: "border-box",
    };

    const buttonStyle: React.CSSProperties = {
        fontSize: "1.1rem",
        padding: "0.55rem 1.2rem",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        height: "40px",
        alignSelf: "center",
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h4>Cash Transaction Filter</h4>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                    alignItems: "center",
                }}
            >
                <div>
                    <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>
                        Cash transaction type:
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Select" disabled>
                            Select
                        </option>
                        <option value="DEPOSIT">Deposit</option>
                        <option value="FEE">Fees</option>
                        <option value="WITHDRAWAL">Withdrawals</option>
                        <option value="DIVIDEND">Dividends</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>From:</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "600" }}>To:</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <button onClick={fetchTransactions} style={buttonStyle}>
                    Apply Filter
                </button>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {!loading && !error && transactions.length === 0 && <div>No transactions found.</div>}

            {!loading && !error && transactions.length > 0 && (
                <table className="table table-bordered mt-3">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((d: any, i) => (
                        <tr key={i}>
                            <td>{d.date}</td>
                            <td>{Number(d.amount).toFixed(2)}</td>
                            <td>{d.currency}</td>
                            <td>{d.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CashTransactionChecker;

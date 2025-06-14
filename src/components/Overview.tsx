import React, { useState } from "react";
import CashTransactionChecker from "./CashTransactionChecker";
import TransactionChecker from "./TransactionChecker";

const Overview = () => {
    const [activeTab, setActiveTab] = useState<string>("home"); // default to home

    return (
        <div className="container mt-4">
            <h2>Overview</h2>
            <div className="mb-4">
                <button
                    className={`btn btn-outline-primary me-2 mb-2 ${activeTab === "home" ? "active" : ""}`}
                    onClick={() => setActiveTab("home")}>Home</button>
                {/*
                Home button must show:
                Current cash
                Total deposits till now
                Total withdrawals till now
                Total fees till now
                Total dividends till now
                Total investments till now
                Last portfolio value
                Last Unrealized P/L value
                Last Unrealized P/L percentage
                Total sold
                Realized P/L
                */}
                <button
                    className={`btn btn-outline-primary me-2 mb-2 ${activeTab === "portfolioChecker" ? "active" : ""}`}
                    onClick={() => setActiveTab("portfolioChecker")}>Show Portfolio</button>
                {/*
                Show portfolio:
                Product
                Quantity
                Invested money
                Dividends received
                */}
                <button
                    className={`btn btn-outline-primary me-2 mb-2 ${activeTab === "cashTransactionsChecker" ? "active" : ""}`}
                    onClick={() => setActiveTab("cashTransactionsChecker")}>Cash transactions checker</button>
                <button
                    className={`btn btn-outline-primary me-2 mb-2 ${activeTab === "transactionsChecker" ? "active" : ""}`}
                    onClick={() => setActiveTab("transactionsChecker")}>Transactions checker</button>
                <button
                    className={`btn btn-outline-primary me-2 mb-2 ${activeTab === "yearOverYear" ? "active" : ""}`}
                    onClick={() => setActiveTab("yearOverYear")}>YoY</button>
                {/*
                Show overview during the years:
                Year
                Total deposits
                Total withdrawals
                Total investments
                Total dividends
                Total fees
                Last portfolio value for the year
                Last unrealized P/L value for the year
                Average unrealized P/L percentage

                */}






            </div>

            {/* Content Area */}
            <div className="mt-3">
                {activeTab === "home" && <p>Welcome to your financial dashboard. Select an option above to view more details.</p>}
                {activeTab === "cashTransactionsChecker" && <CashTransactionChecker />}
                {activeTab === "transactionsChecker" && <TransactionChecker />}
                {activeTab === "transactions" && <p>Transactions view coming soon...</p>}
            </div>
        </div>
    );
};

export default Overview;

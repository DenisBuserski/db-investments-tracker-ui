import React, { useEffect, useState } from "react";
import axios from "axios";

interface BalanceData {
    date: string;
    balance: number;
    totalInvestments: number;
    totalDeposits: number;
    totalWithdrawals: number;
    totalDividends: number;
    totalFees: number;
    lastPortfolioValue: number;
}

const StatCard = ({ label, value }: { label: string; value: number | string }) => (
    <div className="col">
        <div className="card border-primary shadow-sm h-100">
            <div className="card-body text-center">
                <h6 className="card-title">{label}</h6>
                <p className="fw-bold mb-0">{value}</p>
            </div>
        </div>
    </div>
);

const BalanceOverview = () => {
    const [data, setData] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_GET_BALANCE_URL;

        if (!apiUrl) {
            setError("REACT_APP_API_GET_BALANCE_URL is not defined in .env");
            setLoading(false);
            return;
        }

        axios
            .get<BalanceData>(apiUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching balance data:", err);
                setError("Failed to fetch balance data");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading balance data...</p>;
    if (error) return <p>{error}</p>;
    if (!data) return <p>No balance data found.</p>;

    const unrealizedPL = data.lastPortfolioValue - data.totalInvestments;
    const unrealizedPLPercent =
        data.totalInvestments > 0
            ? ((unrealizedPL / data.totalInvestments) * 100).toFixed(2)
            : "0.00";

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <StatCard label="Date" value={data.date} />
            <StatCard label="Current Cash" value={data.balance.toFixed(2)} />
            <StatCard label="Total Deposits" value={data.totalDeposits.toFixed(2)} />
            <StatCard label="Total Withdrawals" value={data.totalWithdrawals.toFixed(2)} />
            <StatCard label="Total Fees" value={data.totalFees.toFixed(2)} />
            <StatCard label="Total Dividends" value={data.totalDividends.toFixed(2)} />
            <StatCard label="Total Investments" value={data.totalInvestments.toFixed(2)} />
            <StatCard label="Last Portfolio Value" value={data.lastPortfolioValue.toFixed(2)} />
            <StatCard label="Last Unrealized P/L" value={unrealizedPL.toFixed(2)} />
            <StatCard label="Last Unrealized P/L %" value={`${unrealizedPLPercent}%`} />
            <StatCard label="Total Sold" value={0} />
            <StatCard label="Realized P/L" value={0} />
        </div>
    );
};

export default BalanceOverview;

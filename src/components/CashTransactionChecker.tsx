import React, { useEffect, useState } from "react";
import axios from "axios";

const CashTransactionChecker = () => {
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/deposits")
            .then(res => setDeposits(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h4>All Cash transactions</h4>
            <div>
                Deposits / Withdrawals / Dividends / Fees
            </div>
            <ul className="list-group">
                {deposits.map((d: any, i) => (
                    <li className="list-group-item" key={i}>
                        {d.date} - {d.amount} {d.currency} - {d.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CashTransactionChecker;

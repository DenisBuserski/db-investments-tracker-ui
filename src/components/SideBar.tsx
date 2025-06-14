import React from 'react';

type SideBarProps = {
    onSelectTab: (tab: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({ onSelectTab }) => {
    return (
        <div
            className="position-fixed top-0 start-0 bg-light border-end p-3 h-100"
            style={{ width: '250px' }}>
            <h5 className="mb-4 border-bottom pb-2">Navigation</h5>
            <div className="d-grid gap-2">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => onSelectTab('overview')}>Overview</button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => onSelectTab('createDeposit')}>Create Deposit</button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => onSelectTab('createWithdrawal')}>Create Withdrawal</button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => onSelectTab('createTransaction')}>Create Transaction</button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => onSelectTab('createDividend')}>Create Dividend</button>
            </div>
        </div>
    );
};

export default SideBar;

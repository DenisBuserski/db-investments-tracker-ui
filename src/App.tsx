import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import SideBar from "./components/side/SideBar";
import Overview from "./components/forms/Overview";
import DepositForm from "./components/side/DepositForm";
import WithdrawalForm from "./components/side/WithdrawalForm";
import CreateTransactionForm from "./components/side/CreateTransactionForm";
import DividendForm from "./components/side/CreateDividendForm";



// Main app component
// Like the 'homepage' or the root of the app UI
// package.json - Lists the project dependencies, scripts, and metadata
function App() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <Overview/>
      case 'createDeposit':
        return <DepositForm/>
      case 'createWithdrawal':
        return <WithdrawalForm/>
      case 'createTransaction':
        return <CreateTransactionForm/>
      case 'createDividend':
        return <DividendForm/>
      default:
        return <Overview/>
    }
  };

  return (
      <div className="d-flex">
        <SideBar onSelectTab={setSelectedTab} />
        <main
            className="flex-grow-1 p-4"
            style={{ marginLeft: '250px', minHeight: '100vh' }}>
          {renderContent()}
        </main>
      </div>

      // <div className="App">
      //     <header className="App-header">
      //         <div>
      //             <CreateDepositForm></CreateDepositForm>
      //         </div>
      // {/*<img src={logo} className="App-logo" alt="logo" />*/}
      // {/*<p>*/}
      // {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
      // {/*</p>*/}
      // {/*<a className="App-link"*/}
      // {/*   href="https://reactjs.org"*/}
      // {/*   target="_blank"*/}
      // {/*   rel="noopener noreferrer">Learn React</a>*/}
      //
      //         <div><Message></Message></div>
      //         <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}></ListGroup></div>
      //         <div>
      //             <Alert>
      //                 Hello <span>Denis</span>
      //             </Alert>
      //         </div>
      //     </header>
      // </div>
  );
}

export default App;

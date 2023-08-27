// import React, {useEffect, useState} from 'react'
// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import "./App.css";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BankList from './components/BankList';
import BankEdit from './components/BankEdit';

const App = () => {
  // const [banks, setBanks] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch('/api/banks/')
  //     .then(response => response.json())
  //     .then(data => {
  //       setBanks(data);
  //       setLoading(false);
  //     })
  // }, []);

  // if(loading) {
  //   return <p>Loading....</p>
  // }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <div className="App-intro">
  //         <h2>Bank List</h2>
  //         {banks.map(bank => 
  //           <div key={bank.accountNumber}>
  //             {bank.accountNumber}
  //           </div>
  //           )}
  //       </div>
  //     </header>
  //   </div>
  // );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/banks/list/" exact={true} element={<BankList/>} />
      </Routes>
    </Router>
  );
}

export default App;

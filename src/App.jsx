// import React, {useEffect, useState} from 'react'
// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import "./App.css";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BankList from './components/BankList';
import BankEdit from './components/BankEdit';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/banks/" exact={true} element={<BankList/>} />
        <Route path="/banks/:id" element={<BankEdit />} />
      </Routes>
    </Router>
  );
}

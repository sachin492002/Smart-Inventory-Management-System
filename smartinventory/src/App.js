import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Predictions from "./components/Predictions";
function App() {

    return (
        <div className='flex flex-col  min-w-full'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/trends" element={<Predictions />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

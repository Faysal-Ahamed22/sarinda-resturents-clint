import React from 'react';
import { Outlet } from 'react-router-dom';
import Foorter from '../Pages/Shared/Foorter';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {
    return (
        <div className="min-h-screen bg-base-200 pt-16 sm:pt-20">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Foorter></Foorter>
        </div>
    );
};

export default Main;
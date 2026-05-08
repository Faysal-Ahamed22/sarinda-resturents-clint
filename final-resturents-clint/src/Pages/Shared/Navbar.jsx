import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

    const handleLogout = () => {
        Swal.fire({
            icon: 'question',
            title: 'Log out?',
            text: 'You will need to sign in again to access your account.',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#64748b',
        }).then((result) => {
            if (result.isConfirmed) {
                logOut().then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged out',
                        text: 'You have been signed out successfully.',
                        confirmButtonColor: '#10b981',
                    }).then(() => {
                        navigate('/login');
                    });
                });
            }
        });
    };

    const navOptions = <>
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/menu'}>OUR MENU</Link></li>
        <li><Link to={'/order'}>ORDER FOOD</Link></li>
        <li><Link to={'/dashboard'} className="flex items-center gap-2"><FaUserCircle className='text-xl' />USER DASHBOARD</Link></li>
    </>
    return (
        <>
            <div className="navbar fixed left-0 right-0 top-0 z-10 w-full border-b border-base-300 bg-base-100/95 text-base-content shadow-sm backdrop-blur">
                <div className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-3 sm:px-4 lg:gap-4">
                    <div className="navbar-start w-auto">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost text-base-content lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content z-20 mt-3 w-[calc(100vw-1.5rem)] max-w-xs rounded-box bg-base-100 p-2 text-base-content shadow">
                                {navOptions}
                            </ul>
                        </div>
                        <Link to={'/'} className="btn btn-ghost text-lg text-base-content sm:text-xl">SARINDA</Link>
                    </div>
                    <div className="navbar-center hidden flex-1 justify-center lg:flex">
                        <ul className="menu menu-horizontal items-center px-1 text-base-content">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end ml-auto w-auto">
                        {user ? (
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="hidden max-w-[10rem] truncate rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 sm:block">
                                    {displayName}
                                </div>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline sm:btn-md">
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to={'/signup'} className="btn btn-sm btn-ghost px-3 sm:btn-md"> Sign Up </Link>
                                <Link to={'/login'} className="btn btn-sm btn-outline px-3 sm:btn-md"> Login </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
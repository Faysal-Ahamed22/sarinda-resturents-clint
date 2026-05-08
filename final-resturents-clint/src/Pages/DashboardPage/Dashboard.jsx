import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Cart from '../CartPage/Cart';
import Booking from './Booking';
import Review from './Review';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { user, userRole, loading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('cart');

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-amber-600"></span>
            </div>
        );
    }

    if (userRole === 'admin') {
        return <AdminDashboard />;
    }

    return (
        <div className="min-h-screen bg-base-200 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-700 px-6 py-8 text-white shadow-2xl sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">User Dashboard</p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome back, {user?.displayName || user?.email || 'User'}</h1>
                    <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                        Manage your cart, send a seat booking request, and check your reviews from one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                        <div className="space-y-1 px-2 pb-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Dashboard Menu</p>
                            <h2 className="text-lg font-semibold text-base-content">Sections</h2>
                        </div>
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('cart')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'cart' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Cart
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('review')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'review' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Review
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('booking')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'booking' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Booking
                            </button>
                        </div>
                    </aside>

                    <main className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
                        {activeTab === 'cart' ? (
                            <Cart embedded />
                        ) : activeTab === 'booking' ? (
                            <Booking />
                        ) : activeTab === 'review' ? (
                            <Review />
                        ) : null}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
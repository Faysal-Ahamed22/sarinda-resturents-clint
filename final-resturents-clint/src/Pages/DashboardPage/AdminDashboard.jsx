import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../Hook/useAxios';

const emptyMenuForm = {
    name: '',
    category: 'popular',
    price: '',
    recipe: '',
    image: '',
};

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [activeTab, setActiveTab] = useState('reservations');
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [menuForm, setMenuForm] = useState(emptyMenuForm);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [savingMenu, setSavingMenu] = useState(false);
    const [processingId, setProcessingId] = useState('');

    const loadAdminData = async () => {
        setLoading(true);
        try {
            const [menuRes, bookingRes, userRes] = await Promise.all([
                axiosSecure.get('/menu'),
                axiosSecure.get('/bookings'),
                axiosSecure.get('/users'),
            ]);

            setMenuItems(Array.isArray(menuRes.data) ? menuRes.data : []);
            setBookings(Array.isArray(bookingRes.data) ? bookingRes.data : []);
            setUsers(Array.isArray(userRes.data) ? userRes.data : []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    const resetMenuForm = () => {
        setMenuForm(emptyMenuForm);
        setEditingMenuId(null);
    };

    const handleMenuSubmit = async (event) => {
        event.preventDefault();
        setSavingMenu(true);

        const payload = {
            ...menuForm,
            price: Number(menuForm.price),
        };

        try {
            if (editingMenuId) {
                await axiosSecure.patch(`/menu/${editingMenuId}`, payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Menu updated',
                    text: 'The item has been updated successfully.',
                    confirmButtonColor: '#f59e0b',
                });
            } else {
                await axiosSecure.post('/menu', payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Menu added',
                    text: 'The new item has been added to the menu.',
                    confirmButtonColor: '#f59e0b',
                });
            }

            resetMenuForm();
            await loadAdminData();
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Save failed',
                text: 'Could not save the menu item.',
                confirmButtonColor: '#f59e0b',
            });
        } finally {
            setSavingMenu(false);
        }
    };

    const handleEditMenu = (item) => {
        setEditingMenuId(item._id);
        setMenuForm({
            name: item.name || '',
            category: item.category || 'popular',
            price: item.price ?? '',
            recipe: item.recipe || '',
            image: item.image || '',
        });
        setActiveTab('menu');
    };

    const handleDeleteMenu = (id) => {
        Swal.fire({
            title: 'Delete this item?',
            text: 'This will remove the item from the menu.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            setProcessingId(id);
            try {
                await axiosSecure.delete(`/menu/${id}`);
                await loadAdminData();
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: 'The item has been removed.',
                    confirmButtonColor: '#f59e0b',
                });
            } finally {
                setProcessingId('');
            }
        });
    };

    const handleConfirmBooking = async (id) => {
        setProcessingId(id);
        try {
            await axiosSecure.patch(`/bookings/${id}/confirm`);
            await loadAdminData();
            Swal.fire({
                icon: 'success',
                title: 'Reservation confirmed',
                text: 'The booking request has been accepted.',
                confirmButtonColor: '#f59e0b',
            });
        } finally {
            setProcessingId('');
        }
    };

    const handleDeleteBooking = async (id) => {
        Swal.fire({
            title: 'Delete reservation?',
            text: 'This will remove the booking request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            setProcessingId(id);
            try {
                await axiosSecure.delete(`/bookings/${id}`);
                await loadAdminData();
            } finally {
                setProcessingId('');
            }
        });
    };

    const handleMakeAdmin = async (id) => {
        setProcessingId(id);
        try {
            await axiosSecure.patch(`/users/${id}/role`, { role: 'admin' });
            await loadAdminData();
            Swal.fire({
                icon: 'success',
                title: 'Role updated',
                text: 'The user is now an admin.',
                confirmButtonColor: '#f59e0b',
            });
        } finally {
            setProcessingId('');
        }
    };

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Delete this user?',
            text: 'This action removes the user record from the database.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            setProcessingId(id);
            try {
                await axiosSecure.delete(`/users/${id}`);
                await loadAdminData();
            } finally {
                setProcessingId('');
            }
        });
    };

    return (
        <div className="min-h-screen bg-base-200 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-700 px-6 py-8 text-white shadow-2xl sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">Admin Dashboard</p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                        Welcome back, {user?.displayName || user?.email || 'Admin'}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                        Manage menu items, confirm reservations, and control user roles from one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm">
                        <div className="space-y-1 px-2 pb-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Admin Menu</p>
                            <h2 className="text-lg font-semibold text-base-content">Sections</h2>
                        </div>
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('reservations')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'reservations' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Reservations
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('menu')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'menu' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Manage Menu
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('users')}
                                className={`w-full rounded-2xl px-4 py-3 text-left font-medium transition ${activeTab === 'users' ? 'bg-amber-600 text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                            >
                                Manage Users
                            </button>
                        </div>
                    </aside>

                    <main className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
                        {loading ? (
                            <div className="flex min-h-[480px] items-center justify-center">
                                <span className="loading loading-spinner loading-lg text-amber-600"></span>
                            </div>
                        ) : activeTab === 'reservations' ? (
                            <div className="space-y-5">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Reservation Queue</p>
                                    <h2 className="mt-1 text-2xl font-bold text-base-content">Accept booking requests</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                    {bookings.length > 0 ? bookings.map((booking) => (
                                        <div key={booking._id} className="rounded-2xl border border-base-300 bg-base-50 p-5 shadow-sm">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-base-content">{booking.seatLabel || booking.seatId || 'Seat booking'}</h3>
                                                    <p className="mt-1 text-sm text-base-content/60">{booking.email}</p>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {booking.status || 'pending'}
                                                </span>
                                            </div>

                                            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-base-content/70 sm:grid-cols-2">
                                                <div>
                                                    <p className="font-medium text-base-content">Guests</p>
                                                    <p>{booking.guests || 0}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-base-content">Date</p>
                                                    <p>{booking.date || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-base-content">Name</p>
                                                    <p>{booking.name || 'Guest'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-base-content">Notes</p>
                                                    <p className="line-clamp-2">{booking.notes || 'None'}</p>
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleConfirmBooking(booking._id)}
                                                    disabled={booking.status === 'confirmed' || processingId === booking._id}
                                                    className="btn border-none bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300"
                                                >
                                                    {booking.status === 'confirmed' ? 'Confirmed' : 'Accept Reservation'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteBooking(booking._id)}
                                                    disabled={processingId === booking._id}
                                                    className="btn border-none bg-rose-500 text-white hover:bg-rose-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="rounded-3xl border border-dashed border-base-300 px-6 py-16 text-center text-base-content/70 xl:col-span-2">
                                            No reservations yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : activeTab === 'menu' ? (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                                <section className="rounded-3xl border border-base-300 bg-base-50 p-5 shadow-sm sm:p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Menu CRUD</p>
                                    <h2 className="mt-1 text-2xl font-bold text-base-content">{editingMenuId ? 'Edit menu item' : 'Add menu item'}</h2>

                                    <form onSubmit={handleMenuSubmit} className="mt-6 space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-base-content/70">Name</label>
                                            <input
                                                type="text"
                                                value={menuForm.name}
                                                onChange={(event) => setMenuForm((prev) => ({ ...prev, name: event.target.value }))}
                                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-base-content/70">Category</label>
                                            <input
                                                type="text"
                                                value={menuForm.category}
                                                onChange={(event) => setMenuForm((prev) => ({ ...prev, category: event.target.value }))}
                                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-base-content/70">Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={menuForm.price}
                                                onChange={(event) => setMenuForm((prev) => ({ ...prev, price: event.target.value }))}
                                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-base-content/70">Recipe</label>
                                            <textarea
                                                value={menuForm.recipe}
                                                onChange={(event) => setMenuForm((prev) => ({ ...prev, recipe: event.target.value }))}
                                                rows={4}
                                                className="textarea textarea-bordered w-full border-base-300 bg-base-100 text-base-content"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-base-content/70">Image URL</label>
                                            <input
                                                type="text"
                                                value={menuForm.image}
                                                onChange={(event) => setMenuForm((prev) => ({ ...prev, image: event.target.value }))}
                                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                type="submit"
                                                disabled={savingMenu}
                                                className="btn border-none bg-amber-600 text-white hover:bg-amber-700"
                                            >
                                                {savingMenu ? 'Saving...' : editingMenuId ? 'Update Item' : 'Add Item'}
                                            </button>
                                            {editingMenuId ? (
                                                <button
                                                    type="button"
                                                    onClick={resetMenuForm}
                                                    className="btn border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                                                >
                                                    Cancel Edit
                                                </button>
                                            ) : null}
                                        </div>
                                    </form>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Existing Items</p>
                                        <h2 className="mt-1 text-2xl font-bold text-base-content">Menu list</h2>
                                    </div>

                                    <div className="space-y-4">
                                        {menuItems.length > 0 ? menuItems.map((item) => (
                                            <div key={item._id} className="rounded-2xl border border-base-300 bg-base-50 p-4 shadow-sm">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-base-content">{item.name}</h3>
                                                        <p className="text-sm text-base-content/60">{item.category}</p>
                                                    </div>
                                                    <p className="text-lg font-bold text-amber-700">${Number(item.price).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-3 text-sm text-base-content/70">{item.recipe}</p>
                                                <div className="mt-4 flex flex-wrap gap-3">
                                                    <button type="button" onClick={() => handleEditMenu(item)} className="btn btn-sm border-none bg-sky-600 text-white hover:bg-sky-700">Edit</button>
                                                    <button type="button" onClick={() => handleDeleteMenu(item._id)} disabled={processingId === item._id} className="btn btn-sm border-none bg-rose-500 text-white hover:bg-rose-600">Delete</button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="rounded-3xl border border-dashed border-base-300 px-6 py-16 text-center text-base-content/70">
                                                No menu items found.
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Manage Users</p>
                                    <h2 className="mt-1 text-2xl font-bold text-base-content">Promote or remove users</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                    {users.length > 0 ? users.map((item) => (
                                        <div key={item._id} className="rounded-2xl border border-base-300 bg-base-50 p-5 shadow-sm">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-base-content">{item.name || 'Unknown user'}</h3>
                                                    <p className="mt-1 text-sm text-base-content/60">{item.email}</p>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-base-200 text-base-content/70'}`}>
                                                    {item.role || 'user'}
                                                </span>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleMakeAdmin(item._id)}
                                                    disabled={item.role === 'admin' || processingId === item._id}
                                                    className="btn border-none bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300"
                                                >
                                                    Make Admin
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteUser(item._id)}
                                                    disabled={processingId === item._id}
                                                    className="btn border-none bg-rose-500 text-white hover:bg-rose-600"
                                                >
                                                    Delete User
                                                </button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="rounded-3xl border border-dashed border-base-300 px-6 py-16 text-center text-base-content/70 xl:col-span-2">
                                            No users found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

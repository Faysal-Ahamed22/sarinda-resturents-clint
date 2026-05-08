import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';

const Cart = ({ embedded = false }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
        if (!id) return;

        Swal.fire({
            title: 'Remove this item?',
            text: 'This will remove the item from your cart.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b'
        }).then((result) => {
            if (!result.isConfirmed) return;

            axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    const removed = res.data?.deletedCount > 0 || res.status === 200;
                    if (removed) {
                        setCartItems(prev => prev.filter(i => (i._id || i.menuId) !== id));
                        Swal.fire({ icon: 'success', title: 'Removed', text: 'Item removed from cart.', confirmButtonColor: '#ef4444' });
                    } else {
                        Swal.fire({ icon: 'error', title: 'Remove failed', text: 'Server did not remove the item.' });
                    }
                })
                .catch(() => {
                    Swal.fire({ icon: 'error', title: 'Error', text: 'Could not remove item. Try again.' });
                });
        });
    }

    useEffect(() => {
        if (!user?.email) {
            setCartItems([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        axiosSecure.get('/carts')
            .then(res => {
                const items = Array.isArray(res.data) ? res.data : [];
                const userCartItems = items.filter(item => item.email === user.email);
                setCartItems(userCartItems);
            })
            .finally(() => setLoading(false));
    }, [axiosSecure, user?.email]);

    const subtotal = cartItems.reduce((s, it) => s + (parseFloat(it.price) || 0), 0);
    const totalItems = cartItems.length;
    const handlePayNow = () => {
        Swal.fire({
            icon: 'info',
            title: 'Not implemented',
            text: 'Pay functionality will be implemented later.',
            confirmButtonColor: '#f59e0b'
        });
    }

    return (
        <div className={embedded ? 'w-full' : 'mx-auto w-full max-w-screen-xl px-4 py-28'}>
            <div className={`mb-8 space-y-3 ${embedded ? 'text-left' : 'text-center'}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Your Cart</p>
                <h1 className="text-3xl font-bold text-base-content sm:text-4xl">Cart for {user?.displayName || user?.email || 'your account'}</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-amber-600"></span>
                </div>
            ) : cartItems.length > 0 ? (
                <div className={`grid grid-cols-1 gap-6 ${embedded ? '' : 'lg:grid-cols-[minmax(0,1fr)_320px]'}`}>
                    <div className={`grid grid-cols-1 gap-6 ${embedded ? '' : 'md:grid-cols-2'}`}>
                        {cartItems.map(item => (
                        <div key={item._id || item.menuId || `${item.email}-${item.name}`} className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <figure className="h-44 w-full overflow-hidden bg-base-200 sm:h-52">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            </figure>

                            <div className="space-y-4 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-base-content">{item.name}</h2>
                                        <p className="mt-1 text-sm text-base-content/60">{item.email}</p>
                                    </div>
                                    <div className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                                        ${item.price}
                                    </div>
                                </div>

                                <button type="button" onClick={() => handleDelete(item._id)} className="btn btn-block border-none bg-rose-500 text-white hover:bg-rose-600">
                                    Remove From Cart
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>

                    <aside className="rounded-2xl border border-base-300 bg-base-50 p-5 shadow-sm sm:p-6">
                        <h3 className="text-lg font-semibold text-base-content">Order Summary</h3>
                        <div className="mt-4 flex items-center justify-between text-sm text-base-content/70">
                            <span>Items</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm text-base-content/70">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 border-t border-base-200 pt-4">
                            <div className="flex items-center justify-between text-xl font-semibold">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <button onClick={handlePayNow} className="mt-6 w-full rounded-md bg-amber-600 px-4 py-3 font-semibold text-white hover:bg-amber-700">PAY NOW</button>
                        </div>
                    </aside>
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 px-6 py-16 text-center">
                    <h2 className="text-2xl font-semibold text-base-content">Your cart is empty</h2>
                    <p className="mt-2 text-base text-base-content/70">Add some items from the menu and they will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
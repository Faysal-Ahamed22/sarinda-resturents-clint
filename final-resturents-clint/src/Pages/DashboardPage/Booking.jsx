import React, { useContext, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../Hook/useAxios';

const availableSeats = [
    { id: 'A1', label: 'Window A1', capacity: '1-2 people' },
    { id: 'A2', label: 'Window A2', capacity: '1-2 people' },
    { id: 'B1', label: 'Booth B1', capacity: '2-4 people' },
    { id: 'B2', label: 'Booth B2', capacity: '2-4 people' },
    { id: 'C1', label: 'Family C1', capacity: '4-6 people' },
    { id: 'C2', label: 'Family C2', capacity: '4-6 people' },
];

const Booking = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [selectedSeat, setSelectedSeat] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [guestCount, setGuestCount] = useState(2);
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);

    const loadBookings = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get('/bookings');
            setBookings(Array.isArray(response.data) ? response.data : []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, [axiosSecure, user?.email]);

    const resolveSeatStatus = (seatId) => {
        const seatBookings = bookings
            .filter((booking) => booking.seatId === seatId)
            .sort((left, right) => new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime());

        const confirmedBooking = seatBookings.find((booking) => booking.status === 'confirmed');
        if (confirmedBooking) {
            return confirmedBooking.email === user?.email
                ? { state: 'reserved', booking: confirmedBooking }
                : { state: 'unavailable', booking: confirmedBooking };
        }

        const pendingBooking = seatBookings.find((booking) => booking.status === 'pending' && booking.email === user?.email);
        if (pendingBooking) {
            return { state: 'pending', booking: pendingBooking };
        }

        return { state: 'available', booking: null };
    };

    useEffect(() => {
        if (loading) {
            return;
        }

        const currentState = selectedSeat ? resolveSeatStatus(selectedSeat).state : '';
        if (currentState === 'available' || currentState === 'pending' || currentState === 'reserved') {
            return;
        }

        const firstAvailableSeat = availableSeats.find((seat) => resolveSeatStatus(seat.id).state === 'available');
        setSelectedSeat(firstAvailableSeat?.id || '');
    }, [bookings, loading, user?.email]);

    const selectedSeatInfo = useMemo(
        () => availableSeats.find((seat) => seat.id === selectedSeat) || null,
        [selectedSeat]
    );

    const selectedSeatStatus = useMemo(
        () => (selectedSeat ? resolveSeatStatus(selectedSeat) : { state: 'available', booking: null }),
        [bookings, selectedSeat, user?.email]
    );

    const handleBookingRequest = async (event) => {
        event.preventDefault();

        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Login required',
                text: 'Please log in before sending a booking request.',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        if (selectedSeatStatus.state !== 'available') {
            Swal.fire({
                icon: 'info',
                title: 'Seat unavailable',
                text: 'Please choose an available seat before sending the request.',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        setSubmitting(true);

        const bookingPayload = {
            name: user.displayName || '',
            email: user.email,
            role: 'user',
            seatId: selectedSeat,
            seatLabel: selectedSeatInfo?.label || selectedSeat,
            guests: Number(guestCount),
            date: bookingDate,
            notes,
            status: 'pending',
        };

        try {
            const response = await axiosSecure.post('/bookings', bookingPayload);
            const created = response.data?.insertedId || response.data?.acknowledged || response.status === 200;

            if (created) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking request sent',
                    text: 'Your reservation request has been submitted successfully.',
                    confirmButtonColor: '#f59e0b',
                });
                setNotes('');
                setBookingDate('');
                setGuestCount(2);
                await loadBookings();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Request failed',
                    text: 'The server did not accept the booking request.',
                    confirmButtonColor: '#f59e0b',
                });
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Request failed',
                text: 'Could not send the booking request. Please try again.',
                confirmButtonColor: '#f59e0b',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const getSeatButtonStyles = (state, active) => {
        if (state === 'unavailable') {
            return 'border-rose-500 bg-rose-50 text-rose-700';
        }
        if (state === 'reserved') {
            return 'border-emerald-500 bg-emerald-50 text-emerald-700';
        }
        if (state === 'pending') {
            return 'border-amber-500 bg-amber-50 text-amber-700';
        }
        return active ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-base-300 bg-base-50 hover:border-amber-300';
    };

    return (
        <div className="w-full space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Seat Booking</p>
                            <h2 className="mt-1 text-2xl font-bold text-base-content">Available seats</h2>
                        </div>
                        <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                            {availableSeats.length} seats total
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <span className="loading loading-spinner loading-lg text-amber-600"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {availableSeats.map((seat) => {
                                const seatStatus = resolveSeatStatus(seat.id).state;
                                const active = selectedSeat === seat.id;
                                const clickable = seatStatus === 'available';

                                return (
                                    <button
                                        key={seat.id}
                                        type="button"
                                        onClick={() => clickable && setSelectedSeat(seat.id)}
                                        disabled={!clickable}
                                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed ${getSeatButtonStyles(seatStatus, active)}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-inherit">{seat.label}</h3>
                                                <p className="mt-1 text-sm opacity-70">Seat ID: {seat.id}</p>
                                            </div>
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${seatStatus === 'available' ? 'bg-base-200 text-base-content/70' : 'bg-white/80 text-inherit'}`}>
                                                {seat.capacity}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
                                            {seatStatus === 'available' ? 'Available' : seatStatus === 'pending' ? 'Pending' : seatStatus === 'reserved' ? 'Reserved' : 'Unavailable'}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </section>

                <aside className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Request Form</p>
                    <h2 className="mt-1 text-2xl font-bold text-base-content">Send booking request</h2>
                    <form onSubmit={handleBookingRequest} className="mt-6 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Selected seat</label>
                            <input
                                type="text"
                                readOnly
                                value={selectedSeatInfo ? `${selectedSeatInfo.label} (${selectedSeat})` : 'Choose an available seat'}
                                className="input input-bordered w-full border-base-300 bg-base-200 text-base-content"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Seat status</label>
                            <input
                                type="text"
                                readOnly
                                value={selectedSeatStatus.state}
                                className="input input-bordered w-full border-base-300 bg-base-200 text-base-content"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Booking date</label>
                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(event) => setBookingDate(event.target.value)}
                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Guests</label>
                            <input
                                type="number"
                                min="1"
                                max="12"
                                value={guestCount}
                                onChange={(event) => setGuestCount(event.target.value)}
                                className="input input-bordered w-full border-base-300 bg-base-100 text-base-content"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                placeholder="Any special request?"
                                rows={4}
                                className="textarea textarea-bordered w-full border-base-300 bg-base-100 text-base-content"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || selectedSeatStatus.state !== 'available'}
                            className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700 disabled:bg-amber-300"
                        >
                            {submitting ? 'Sending request...' : selectedSeatStatus.state === 'available' ? 'Send Booking Request' : 'Choose an available seat'}
                        </button>
                    </form>
                </aside>
            </div>

            <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-5 text-sm text-base-content/70 shadow-sm">
                Confirmed bookings turn red for other users and stay reserved for the user who booked them.
            </div>
        </div>
    );
};

export default Booking;
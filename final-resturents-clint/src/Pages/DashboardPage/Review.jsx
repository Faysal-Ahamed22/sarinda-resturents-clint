import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../Hook/useAxios';

const Review = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [rating, setRating] = useState(5);
    const [details, setDetails] = useState('');

    const loadUserReviews = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get(`/reviews?email=${user?.email}`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            loadUserReviews();
        }
    }, [user?.email, axiosSecure]);

    const handleSubmitReview = async (event) => {
        event.preventDefault();

        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Login required',
                text: 'Please log in before submitting a review.',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        if (!details.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Review text required',
                text: 'Please enter your review text.',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        setSubmitting(true);

        const reviewPayload = {
            name: user.displayName || user.email,
            email: user.email,
            details: details.trim(),
            rating: Number(rating),
        };

        try {
            const response = await axiosSecure.post('/reviews', reviewPayload);
            const created = response.data?.insertedId || response.data?.acknowledged || response.status === 200;

            if (created) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review submitted',
                    text: 'Thank you for your feedback!',
                    confirmButtonColor: '#f59e0b',
                });
                setDetails('');
                setRating(5);
                await loadUserReviews();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submit failed',
                    text: 'Could not submit your review.',
                    confirmButtonColor: '#f59e0b',
                });
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Submit failed',
                text: 'An error occurred while submitting your review.',
                confirmButtonColor: '#f59e0b',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={index < count ? 'text-yellow-400' : 'text-base-300'}>
                ★
            </span>
        ));
    };

    return (
        <div className="w-full space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Submit Your Review</p>
                    <h2 className="mt-1 text-2xl font-bold text-base-content">Share your experience</h2>

                    <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Your name</label>
                            <input
                                type="text"
                                readOnly
                                value={user?.displayName || user?.email || 'Guest'}
                                className="input input-bordered w-full border-base-300 bg-base-200 text-base-content"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Rating</label>
                            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <div className="flex gap-1 text-3xl">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setRating(index + 1)}
                                            className={`transition ${index < rating ? 'text-yellow-400' : 'text-base-300 hover:text-yellow-200'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-base-content/70">{rating} / 5</span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-base-content/70">Your review</label>
                            <textarea
                                value={details}
                                onChange={(event) => setDetails(event.target.value)}
                                placeholder="Tell us about your experience..."
                                rows={5}
                                className="textarea textarea-bordered w-full border-base-300 bg-base-100 text-base-content"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700 disabled:bg-amber-300"
                        >
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </section>

                <aside className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Your Reviews</p>
                        <h2 className="mt-1 text-2xl font-bold text-base-content">Submitted reviews</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <span className="loading loading-spinner loading-lg text-amber-600"></span>
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review._id} className="rounded-2xl border border-base-300 bg-base-50 p-4 shadow-sm">
                                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <h3 className="font-semibold text-base-content">{review.name}</h3>
                                        <div className="flex gap-0.5 text-sm text-yellow-400">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-base-content/70 leading-relaxed">{review.details}</p>
                                    <p className="mt-3 text-xs text-base-content/50">
                                        {review.createdAt
                                            ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                              })
                                            : 'Just now'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-base-300 px-6 py-16 text-center text-base-content/70">
                            No reviews yet. Share your first experience!
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default Review;

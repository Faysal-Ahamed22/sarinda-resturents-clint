import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { creatUser, googleSignIn, loading } = useContext(AuthContext);
    const captchaRef = useRef(null);
    const navigate = useNavigate();
    const [captchaError, setCaptchaError] = useState('');

    useEffect(() => {
        loadCaptchaEnginge(6, '#f3f3f3', 'green', 'lower');
    }, []);

    const handleSignUp = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const captchaValue = captchaRef.current?.value || '';

        if (validateCaptcha(captchaValue) !== true) {
            setCaptchaError('Captcha did not match');
            Swal.fire({
                icon: 'error',
                title: 'Captcha mismatch',
                text: 'Please type the captcha exactly as shown.',
                confirmButtonColor: '#10b981',
            });
            return;
        }

        setCaptchaError('');
        creatUser(name, email, password)
            .then(() => {
                form.reset();
                if (captchaRef.current) {
                    captchaRef.current.value = '';
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Account created',
                    text: 'Your account is ready to use.',
                    confirmButtonColor: '#10b981',
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sign up failed',
                    text: 'Could not create your account.',
                    confirmButtonColor: '#10b981',
                });
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Signed in with Google',
                    text: 'Welcome to Sarinda.',
                    confirmButtonColor: '#10b981',
                }).then(() => {
                    navigate('/');
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google sign in failed',
                    text: 'Please try again.',
                    confirmButtonColor: '#10b981',
                });
            });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6 sm:py-10">
            <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                <div className="grid min-h-[unset] grid-cols-1 lg:min-h-[680px] lg:grid-cols-2">
                    <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-8 lg:p-12">
                        <div className="w-full max-w-md">
                            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)]" />
                                <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-slate-200/50 blur-3xl" />
                                <div className="absolute -right-10 bottom-8 h-32 w-32 rounded-full bg-emerald-200/35 blur-3xl" />
                                <div className="relative flex flex-col items-center gap-4 text-center">
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-6xl shadow-inner ring-8 ring-white/80">
                                        ✨
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                                            Join Us
                                        </p>
                                        <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                            Create Your Account
                                        </h3>
                                        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                                            Sign up with email and password or continue with Google to get started.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
                        <div className="w-full max-w-md">
                            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Sign Up</h2>

                            <form onSubmit={handleSignUp} className="space-y-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-slate-700">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        className="input input-bordered w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-slate-700">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Type here"
                                        className="input input-bordered w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-slate-700">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-slate-700">Captcha</span>
                                    </label>

                                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                                        <LoadCanvasTemplate reloadText="" />
                                    </div>

                                    <input
                                        ref={captchaRef}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered mt-2 w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
                                        required
                                    />

                                    {captchaError ? <p className="mt-2 text-sm text-rose-600">{captchaError}</p> : null}
                                </div>

                                <button type="submit" className="btn w-full border-none bg-emerald-500 text-white hover:bg-emerald-600">
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <p className="text-sm text-slate-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>

                            <div className="divider mt-6 text-slate-400">Or continue with</div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="btn w-full border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
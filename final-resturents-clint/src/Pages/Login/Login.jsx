import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

function Login() {
  const { singIn, loading } = useContext(AuthContext);
  const captchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    loadCaptchaEnginge(6, "#f3f3f3", "green", "lower");
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const captchaValue = captchaRef.current?.value || "";

    if (validateCaptcha(captchaValue) === true) {
      setCaptchaError("");
      singIn(email, password)
        .then(() => {
          form.reset();
          if (captchaRef.current) {
            captchaRef.current.value = "";
          }
          Swal.fire({
            icon: "success",
            title: "Login successful",
            text: "Welcome back to Sarinda.",
            confirmButtonColor: "#f59e0b",
          }).then(() => {
            navigate("/");
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Email or password is incorrect.",
            confirmButtonColor: "#f59e0b",
          });
        });
    } else {
      setCaptchaError("Captcha did not match");
      Swal.fire({
        icon: "error",
        title: "Captcha mismatch",
        text: "Please type the captcha exactly as shown.",
        confirmButtonColor: "#f59e0b",
      });
    }
  }

  function handleReloadCaptcha() {
    loadCaptchaEnginge(6, "#f3f3f3", "green", "lower");
    setCaptchaError("");
    if (captchaRef.current) {
      captchaRef.current.value = "";
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="grid min-h-[unset] grid-cols-1 lg:min-h-[680px] lg:grid-cols-2">
          <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_55%)]" />
                <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-slate-200/50 blur-3xl" />
                <div className="absolute -right-10 bottom-8 h-32 w-32 rounded-full bg-amber-200/35 blur-3xl" />
                <div className="relative flex flex-col items-center gap-4 text-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-6xl shadow-inner ring-8 ring-white/80">
                    🔒
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Secure Access
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                      Welcome Back
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                      Sign in to continue to your restaurant dashboard and manage your orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Login</h2>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-slate-700">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Type here"
                    className="input input-bordered w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
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
                    className="input input-bordered w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
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

                  <button
                    type="button"
                    onClick={handleReloadCaptcha}
                    className="btn btn-link btn-sm mt-1 justify-start px-0 text-slate-600 hover:text-amber-700"
                  >
                    Reload Captcha
                  </button>

                  <input
                    ref={captchaRef}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered mt-2 w-full border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
                    required
                  />

                  {captchaError ? (
                    <p className="mt-2 text-sm text-rose-600">{captchaError}</p>
                  ) : null}
                </div>

                <button type="submit" className="btn w-full border-none bg-amber-500 text-white hover:bg-amber-600">
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-sm text-slate-600">
                  New here?{" "}
                  <Link to="/signup" className="font-semibold text-amber-700 hover:text-amber-800 hover:underline">
                    Create a New Account
                  </Link>
                </p>
              </div>

              <div className="divider mt-6 text-slate-400">Or sign in with</div>

              <div className="flex items-center justify-center gap-4">
                <button className="btn btn-circle btn-outline border-slate-300 text-slate-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700">
                  <span className="font-bold">f</span>
                </button>
                <button className="btn btn-circle btn-outline border-slate-300 text-slate-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700">
                  <span className="font-bold">G</span>
                </button>
                <button className="btn btn-circle btn-outline border-slate-300 text-slate-700 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700">
                  <span className="font-bold">⌂</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
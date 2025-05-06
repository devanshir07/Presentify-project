'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      console.log('Email submitted:', values.email);
      toast.success('Successfully signed up!');
    },
  });

  const handleGoogleSignIn = () => {
    toast('Google sign-in coming soon!', { icon: '🚀' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/next.svg" // Replace with your logo path
            alt="SlideSpeak Logo"
            width={48}
            height={48}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold">SlideSpeak</h1>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Sign up</h2>
        <p className="text-center text-gray-600 mb-6">
          Use your email or another service to sign up for free!
        </p>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full mb-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>
          ) : (
            <div className="mb-4"></div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image
            src="/google.svg" // Add Google logo in public folder
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-3"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

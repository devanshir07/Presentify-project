'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required')
        .min(8, 'Minimum 8 characters')
        .matches(/[a-z]/, 'Lowercase letter is required')
        .matches(/[A-Z]/, 'Uppercase letter is required')
        .matches(/[0-9]/, 'Number is required')
        .matches(/\W/, 'Special character is required'),
    confirmPassword: Yup.string().required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            console.log(values);

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values);
                toast.success('Account created successfully');
                console.log(res.status);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            }
        },
        validationSchema: SignupSchema
    });

    return (
        <div>
            <div className="max-w-lg mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">PRESENTIFY</h1>
                    </div>

                    <div className="mt-5">

                        {/* Form */}
                        <form onSubmit={signupForm.handleSubmit}>
                            <div className="grid gap-y-4">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Name</label>
                                    <input type="text"
                                        id="name"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.name}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" />
                                    {
                                        (signupForm.touched.name && signupForm.errors.name) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.name}</p>
                                        )
                                    }
                                </div>
                                
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                    <input type="email"
                                        id="email"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.email}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" />
                                    {
                                        (signupForm.touched.email && signupForm.errors.email) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.email}</p>
                                        )
                                    }
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                    <input type="password"
                                        id="password"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.password}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" />
                                    {
                                        (signupForm.touched.password && signupForm.errors.password) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.password}</p>
                                        )
                                    }
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                                    <input type="password"
                                        id="confirmPassword"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.confirmPassword}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600" />
                                    {
                                        (signupForm.touched.confirmPassword && signupForm.errors.confirmPassword) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.confirmPassword}</p>
                                        )
                                    }
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-center">
                                    <input id="terms" name="terms" type="checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                                    <label htmlFor="terms" className="ms-3 text-sm dark:text-white">I accept the <a className="text-blue-600 hover:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
                            Already have an account?
                            <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="../examples/html/signin.html">
                                Login
                            </a>
                        </p>


                                {/* Submit Button */}
                                <div className="mt-4">
                                    <button type="submit" className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700">Sign up</button>
                                </div>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
});

const Signup = () => {

    const router = useRouter();   
     const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values);
                toast.success('Account created successfully');
                router.push('/login');
            } catch (error) {
                console.error('Signup error:', error);
                toast.error(error.response?.data?.message || 'Failed to create account');
            }
        }
    });    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[420px] bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-neutral-900/90 dark:border-neutral-700">
                <div className="p-5">
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-black bg-clip-text">Sign Up</h1>
                    </motion.div>                   
                     <div className="mt-3">
                        <form onSubmit={signupForm.handleSubmit}>
                            <div className="grid gap-y-2.5">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Name</label>
                                    <input type="text"
                                        id="name"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.name}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                                    {
                                        (signupForm.touched.name && signupForm.errors.name) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.name}</p>
                                        )
                                    }
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                    <input type="email"
                                        id="email"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.email}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                                    {
                                        (signupForm.touched.email && signupForm.errors.email) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.email}</p>
                                        )
                                    }
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                    <input type="password"
                                        id="password"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.password}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                                    {
                                        (signupForm.touched.password && signupForm.errors.password) && (
                                            <p className="text-xs text-red-600 mt-2">{signupForm.errors.password}</p>
                                        )
                                    }
                                </motion.div>
                                <motion.div 
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center"
                                >
                                    <input id="terms" name="terms" type="checkbox" className="shrink-0 mt-0.5 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                                    <label htmlFor="terms" className="ms-3 text-sm dark:text-white">I accept the <a className="text-blue-600 hover:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                </motion.div>                               
                                 <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-3"
                                >
                                    <button type="submit" className="w-full py-2.5 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                        Sign up
                                    </button>
                                </motion.div>

                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center"
                                >
                                    Already have an account?
                                    <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 ml-1" href="../login">
                                        Login
                                    </a>
                                </motion.p>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
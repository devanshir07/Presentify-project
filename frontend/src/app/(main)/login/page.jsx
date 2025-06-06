'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../contexts/AppContext';

const Login = () => {
    const router = useRouter();
    const { login } = useApp();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log('Form submitted with values:', values);
            
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
                .then((result) => {
                    toast.success('Login successful!');
                    login(result.data.token);
                    localStorage.setItem('token', result.data.token);
                    router.push('/');
                    resetForm();
                }).catch((err) => {
                    setSubmitting(false);
                    console.log(err);
                    toast.error('Login failed!');
                });
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-screen-2xl px-4 md:px-8"
            >
                <motion.h2 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 text-center text-2xl font-bold bg-gradient-to-r from-black bg-clip-text  md:mb-8 lg:text-3xl"
                >
                    Login
                </motion.h2>
                <motion.form 
                    className="mx-auto max-w-sm rounded-xl border bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    onSubmit={formik.handleSubmit}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label
                                htmlFor="email"
                                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full rounded-lg border ${
                                    formik.touched.email && formik.errors.email 
                                        ? 'border-red-500' 
                                        : 'border-gray-300'
                                } bg-gray-50 px-3 py-2.5 text-gray-800 outline-none ring-blue-300 transition duration-200 focus:ring focus:border-blue-500`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label
                                htmlFor="password"
                                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={`w-full rounded-lg border ${
                                    formik.touched.password && formik.errors.password 
                                        ? 'border-red-500' 
                                        : 'border-gray-300'
                                } bg-gray-50 px-3 py-2.5 text-gray-800 outline-none ring-blue-300 transition duration-200 focus:ring focus:border-blue-500`}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                            ) : null}
                        </motion.div>
                        <motion.button 
                            type="submit"
                            className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-200 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-base"
                            disabled={formik.isSubmitting}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                        </motion.button>
                        

                    </div>
                    
                    <motion.div 
                        className="flex items-center justify-center bg-gray-50 p-4 rounded-b-xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <a
                                href="../signup"
                                className="text-blue-600 transition duration-100 hover:text-blue-700 hover:underline"
                            >
                                Register
                            </a>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Login;
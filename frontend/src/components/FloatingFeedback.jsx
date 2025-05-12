'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useApp } from '../contexts/AppContext';
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

// Validation Schema
const FeedbackSchema = Yup.object().shape({
    message: Yup.string()
        .min(5, "Message is too short")
        .max(500, "Message is too long")
        .required("Message is required"),
});

const FloatingFeedback = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const { user } = useApp();


    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.name;

    const feedbackForm = useFormik({
        initialValues: {
            name: userName,
            message: '',
        },
        validationSchema: FeedbackSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!user) {
                router.push('/login');
                return;
            }
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback/add`, values);
                toast.success("Feedback submitted successfully!");
                resetForm();
                setIsModalOpen(false);
            } catch (err) {
                console.log(err);
                toast.error("Error submitting feedback. Please try again.");
            }
        },
    });

    const handleClick = () => {
        if (!user) {
            router.push('/login');
        } else {
            setIsModalOpen(true);
        }
    };
    return (
        <>
            <div className="fixed bottom-8 right-8 z-50">
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-gray-700 whitespace-nowrap text-sm font-medium"
                        >
                            {user ? 'Share your feedback' : 'Login to give feedback'}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={handleClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                    </svg>
                </motion.button>      </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed right-8 bottom-20 flex items-center justify-center z-50 backdrop-blur-[2px]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-6 m-4 max-w-md w-full border border-white/20"
                        >
                            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Share Your Feedback</h2>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={feedbackForm.handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={feedbackForm.values.name}
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50/50 text-gray-500 backdrop-blur-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={feedbackForm.values.message}
                                        onChange={feedbackForm.handleChange}
                                        onBlur={feedbackForm.handleBlur}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors duration-200"
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                    {feedbackForm.touched.message && feedbackForm.errors.message && (
                                        <div className="text-sm text-red-600 mt-1">{feedbackForm.errors.message}</div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Submit Feedback
                                    </button>                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingFeedback;

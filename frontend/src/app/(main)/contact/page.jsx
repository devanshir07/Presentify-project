'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik} from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';
import axios from "axios";
import toast from "react-hot-toast";

// Validation Schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2,"Name is too short")
    .max(50,"Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .required("Phone number is required"),
  details: Yup.string()
    .min(10, "Details must be at least 10 characters long")
    .required("Details are required"),
});

const Contact = () => {
  
  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      details: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/add`,values)
        .then((result) => {
          console.log(result.data);
          toast.success("Contact form submitted successfully!");
          //setSubmitting(false);
          resetForm();
        }).catch((err) => {
          console.log(err);
          toast.error("Error submitting contact form. Please try again.");
          // setSubmitting(false)
        });
    },
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-5 right-5 bg-white shadow-lg rounded-lg p-4 z-50 text-gray-800"
        >
        </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 m-4"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-black bg-clip-text  sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-1 text-gray-600">
            We'd love to talk about how we can help you.
          </p>
        </motion.div>
            <form onSubmit={contactForm.handleSubmit}
            className="mt-8">
              <div className="grid gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.values.name}
                    onChange={contactForm.handleChange}
                    placeholder="Name"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                   {
                     contactForm.touched.name && contactForm.errors.name ? (
                       <div className="text-sm text-red-600">{contactForm.errors.name}</div>
                      ) : null
                    }
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.values.email}
                    onChange={contactForm.handleChange}
                    placeholder="Email"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                   {
                     contactForm.touched.email && contactForm.errors.email ? (
                       <div className="text-sm text-red-600">{contactForm.errors.email}</div>
                      ) : null
                    }
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={contactForm.values.phoneNumber}
                    onChange={contactForm.handleChange}
                    placeholder="Phone Number"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                   {
                     contactForm.touched.phoneNumber && contactForm.errors.phoneNumber ? (
                       <div className="text-sm text-red-600">{contactForm.errors.phoneNumber}</div>
                      ) : null
                    }
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-700">Details</label>
                  <input
                    type="textarea"
                    name="details"
                    value={contactForm.values.details}
                    onChange={contactForm.handleChange}
                    rows={4}
                    placeholder="Details"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                  {
                  contactForm.touched.details && contactForm.errors.details ? (
                    <div className="text-sm text-red-600">{contactForm.errors.details}</div>
                  ) : null
                }
                </motion.div>
              </div>
              <motion.div 
                className="mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Send inquiry
                </button>
              </motion.div>
            </form>
      </motion.div>
    </div>
  );
};

export default Contact;

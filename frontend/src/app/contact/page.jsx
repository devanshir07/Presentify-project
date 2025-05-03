'use client';

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';

// Validation Schema
const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .required("Phone number is required"),
  details: Yup.string()
    .min(10, "Details must be at least 10 characters long")
    .required("Details are required"),
});

const Contact = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted values:", values);
    setToastMessage("Your inquiry has been submitted successfully!");
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);

    resetForm();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-5 right-5 bg-white shadow-lg rounded-lg p-4 z-50 text-gray-800"
        >
          {toastMessage}
        </motion.div>
      )}
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-1 text-gray-600">
            We'd love to talk about how we can help you.
          </p>
        </motion.div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            details: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Field
                    as="textarea"
                    name="details"
                    rows={4}
                    placeholder="Details"
                    className="py-2.5 px-4 block w-full border-2 border-gray-300 rounded-lg sm:text-sm focus:border-pink-500 focus:ring-pink-500 transition-colors duration-200"
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
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
                  className="w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Send inquiry
                </button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default Contact;

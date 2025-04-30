'use client';

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-1 text-gray-600">
            We'd love to talk about how we can help you.
          </p>
        </div>
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
                  <div>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="py-2.5 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="py-2.5 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="py-2.5 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="py-2.5 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    as="textarea"
                    name="details"
                    rows={4}
                    placeholder="Details"
                    className="py-2.5 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm"
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  Send inquiry
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;

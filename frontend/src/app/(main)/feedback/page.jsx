'use client';
import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Validation Schema
const FeedbackSchema = Yup.object().shape({

  message: Yup.string()
    .min(5, "Message is too short")
    .max(500, "Message is too long")
    .required("Message is required"),
});

const Feedback = () => {

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  console.log(name);

  const feebackForm = useFormik({
    initialValues: {
      name: userName,
      message: "",
    },
    validationSchema: FeedbackSchema,
    onSubmit: (values, { resetForm }) => {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback/add`, values)
        .then((result) => {
          console.log(result.data);
          toast.success("Feedback submitted successfully!");
          // setSubmitting(false);
          resetForm();
        }).catch((err) => {
          console.log(err);
          toast.error("Error submitting feedback. Please try again.");
          // setSubmitting(false);
        });
    },

  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 animate-fadeIn">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mx-auto max-w-2xl">
          <div className="text-center transform transition-all duration-300 hover:scale-105">
            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl animate-slideDown">
              Share Your Feedback
            </h2>
          </div>

          <div className="mt-5 p-4 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm sm:mt-10 md:p-10 animate-slideUp">
            <form onSubmit={feebackForm.handleSubmit} className="space-y-4 sm:space-y-6">

              <div className="mb-4 sm:mb-8 transition-all duration-300 transform hover:translate-x-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  disabled
                  onChange={feebackForm.handleChange}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Email address"
                />
              </div>

              <div className="transition-all duration-300 transform hover:translate-x-1">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >

                  Message
                </label>
                <input
                  type="message"
                  id="message"
                  name="message"
                  value={feebackForm.values.message}
                  onChange={feebackForm.handleChange}
                  rows={3}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Leave your feedback here..."
                />
                {
                  feebackForm.touched.message && feebackForm.errors.message ? (
                    <div className="text-sm text-red-600">{feebackForm.errors.message}</div>
                  ) : null
                }
              </div>

              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

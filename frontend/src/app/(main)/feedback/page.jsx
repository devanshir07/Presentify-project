'use client';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Validation Schema
const FeedbackSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name is too short")
    .max(50, "Full name is too long")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  comment: Yup.string()
    .min(5, "Comment is too short")
    .max(500, "Comment is too long")
    .required("Comment is required"),
});

const Feedback = () => {
  const initialValues = {
    fullName: "",
    email: "",
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted values:", values);
    toast.success("Thank you for your feedback!");
    resetForm();
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
            Post a Comment
          </h2>
        </div>
        <div className="mt-5 p-4 bg-white border border-gray-200 rounded-xl sm:mt-10 md:p-10">
          <Formik
            initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Full name
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Full name"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 sm:mb-8">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Email address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block mb-2 text-sm font-medium"
                  >
                    Comment
                  </label>
                  <Field
                    as="textarea"
                    id="comment"
                    name="comment"
                    rows={3}
                    className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Leave your comment here..."
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mt-6 grid">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

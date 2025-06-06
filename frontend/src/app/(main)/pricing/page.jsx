'use client';
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    console.log(`Selected Plan:`, plan); // Log the selected plan to the console
  };
  const handleConfirm = () => {
    if (selectedPlan) {
      console.log(`Confirming Plan:`, selectedPlan); // Log the confirmation details
      toast.success(`Proceeding with the ${selectedPlan.title} plan (Pay ${billingCycle})!`);
    } else {
      toast.error("Please select a plan before confirming.");
    }
  };
  const toggleBillingCycle = () => {
    const newCycle = billingCycle === "Monthly" ? "Annually" : "Monthly";
    setBillingCycle(newCycle);
    toast(`Switched to Pay ${newCycle}.`);
  };
  const plans = [
    {
      id: 1,
      title: "Free",
      price: "₹0",
      description: "Get started with basic features to help you create simple decks and sites.",
      features: ["400 AI credits at signup", "Basic AI image generation", "Generate up to 15 slides"],
    },
    {
      id: 2,
      title: "Plus",
      price: billingCycle === "Monthly" ? "₹199/month" : "₹500/year",
      description: "Unlimited AI and custom branding to elevate your workflow.",
      features: ["Unlimited AI creation", "Advanced AI image generation", "Generate up to 25 slides"],
    },
    {
      id: 3,
      title: "Pro",
      price: billingCycle === "Monthly" ? "₹399/month" : "₹700/year",
      description: "Our most powerful AI and customization tools at your fingertips.",
      features: ["Unlimited AI creation", "Premium AI image generation", "Generate up to 60 slides"],
    },
  ];
  return (
    <>
      <Toaster/>
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto relative">
          <div className="px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-black animate-slideDown">
              Choose the plan that's right for you.
            </h2>
            <p className="mt-3 text-lg text-gray-700 dark:text-neutral-300 animate-slideUp">
              Whatever your status, our offers evolve according to your needs.
            </p>
          </div>

          <div className="mt-6 animate-fadeIn">
            <button
              onClick={toggleBillingCycle}
              className="py-2 px-6 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
            >
              Switch to Pay {billingCycle === "Monthly" ? "Annually" : "Monthly"}
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-5xl">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan)}
                className={`flex flex-col items-center bg-white dark:bg-neutral-800 border rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slideUp ${
                  selectedPlan?.id === plan.id
                    ? "border-violet-600 shadow-lg bg-violet-50 dark:bg-violet-900"
                    : "border-gray-200 hover:border-violet-400"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">{plan.title}</h4>
                <span className="mt-4 text-3xl font-bold text-gray-800 dark:text-neutral-200">{plan.price}</span>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-x-2 transform transition-all duration-300 hover:translate-x-1">
                      <svg
                        className="shrink-0 text-violet-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-gray-700 dark:text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center animate-fadeIn">
            {selectedPlan && (
              <h3 className="text-xl font-medium text-violet-700 animate-slideUp">
                You have selected the <span className="font-bold">{selectedPlan.title}</span> plan (Pay {billingCycle}).
              </h3>
            )}
            <button
              className="mt-4 py-2 px-6 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
              onClick={handleConfirm}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

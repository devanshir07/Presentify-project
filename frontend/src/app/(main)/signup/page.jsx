'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Password validation
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            if (formData.password.length < 6) {
                toast.error('Password must be at least 6 characters long');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Sign up successful!');
                router.push('/login');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('Failed to create account');
        } finally {
            setLoading(false);
        }
    };

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
                            <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="../login">
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

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

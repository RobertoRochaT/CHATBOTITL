import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:9000/api/signup', formData);

            setSuccess(response.data.message);
            setTimeout(() => {
                navigate('/sign-in'); // Redirigir al login
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row my-20 pt-8 lg:px-8 pb-8 lg:gap-16 items-center">
                <div className="shadow-xl sm:w-full lg:w-3/5 mx-auto p-8">
                    <h1 className="text-center text-5xl font-extrabold">Sign Up</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2">Name</label>
                            <input
                                className="p-3 border rounded"
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input
                                className="p-3 border rounded"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="mb-2">Phone</label>
                            <input
                                className="p-3 border rounded"
                                type="text"
                                name="phone"
                                placeholder="Enter phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input
                                className="p-3 border rounded"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="py-3 px-8 bg-lime-600 text-white font-semibold">
                                Submit
                            </button>
                        </div>
                    </form>
                    <p className="pt-8">
                        Already have an account?{' '}
                        <Link className="text-lime-600" to="/sign-in">
                            Click here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;

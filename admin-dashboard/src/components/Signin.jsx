import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:9000/api/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            // Save token to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to dashboard or homepage
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row my-20 pt-8 px-8 pb-8 lg:gap-16 items-center">
                <div className="shadow-xl w-4/5 lg:w-3/5 mx-auto p-8">
                    <h1 className="text-center text-5xl font-extrabold">Sign In</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input
                                className="p-3 border rounded"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        New to here? <Link className="text-lime-600" to="/sign-up">Click here</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signin;

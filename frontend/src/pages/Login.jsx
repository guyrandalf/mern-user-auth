import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle successful login, maybe store the token in local storage
                const responseData = await response.json();
                localStorage.setItem('token', responseData.token); // Store the JWT token in local storage
                console.log('Login successful:', responseData);
            } else {
                // Handle unsuccessful login
                console.error('Login failed');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;

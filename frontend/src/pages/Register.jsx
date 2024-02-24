import React, { useState } from 'react';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null)

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (response.ok) {
                // Handle successful registration, maybe redirect to login page
                const responseData = await response.json();
                console.log('Registration successful:', responseData);
                setErrors(null)
            } else {
                const errorData = await response.json();
                setErrors(errorData.message); // Set the error state with the error message
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Register</h2>
            {Array.isArray(errors) && errors.length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {errors.map((errMsg, index) => (
                            <li key={index}>{errMsg}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Register;

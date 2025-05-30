import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { toast } from 'react-toastify';
import { isFirebaseError } from '../types/errors';

const getErrorMessage = (error: unknown): string => {
    if (!error) return 'An unexpected error occurred';
    if (isFirebaseError(error)) {
        switch (error.code) {
            case 400:
                if (error.message === 'INVALID_LOGIN_CREDENTIALS') {
                    return 'Invalid email or password. Please try again.';
                }
                if (error.message === 'EMAIL_EXISTS') {
                    return 'This email is already registered. Please try a different email.';
                }
                break;
            default:
                return error.message || 'An unexpected error occurred';
        }
    }
    return error instanceof Error ? error.message : 'An unexpected error occurred';
};
type FormEvent = React.FormEvent<HTMLFormElement>

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleRegister();
    }

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Account created successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/');
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='login'>
            <Link to='/' style={{ textDecoration: "none" }}>
                <div className="login__logo">
                    <StorefrontIcon className="login__logoImage" fontSize="large" />
                    <h2 className="login__logoTitle">eSHOP</h2>
                </div>
            </Link>

            <div className='login__container'>
                <h1 className="login__title">Create Account</h1>

                <form className='login__form' onSubmit={handleFormSubmit}>
                    <h5>E-mail</h5>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter your email'
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Enter your password'
                    />

                    <h5>Confirm Password</h5>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder='Confirm your password'
                    />

                    <button type='submit' className='login__signInButton'>Create Account</button>
                </form>

                <p className="login__terms">
                    By creating an account you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button
                    className='login__registerButton'
                    onClick={() => navigate('/login')}
                >
                    Back to Sign In
                </button>
            </div>
        </div>
    )
}

export default Register;

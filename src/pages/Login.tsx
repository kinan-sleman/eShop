import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import StorefrontIcon from '@mui/icons-material/Storefront';


const getErrorMessage = (error: unknown): string => {
    if (!error) return 'An unexpected error occurred';
    if (error instanceof Error) {
        if (error.message.includes('auth/invalid-credential')) {
            return 'Invalid email or password. Please try again.';
        }
        if (error.message.includes('auth/user-not-found')) {
            return 'No user found with this email address.';
        }
        if (error.message.includes('auth/wrong-password')) {
            return 'Incorrect password. Please try again.';
        }
    }
    return 'An unexpected error occurred';
};
type FormEvent = React.FormEvent<HTMLFormElement>

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleAuth();
    }



    const handleAuth = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Logged in successfully!', {
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
            if (error instanceof Error) {
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
            } else {
                toast.error('An unexpected error occurred', {
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
                <h1 className="login__title">Sign-in</h1>

                <form className='login__form' onSubmit={handleFormSubmit}>
                    <h5>E-mail</h5>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p className="login__terms">
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <p className="login__terms">
                    Don't have an account? <Link to="/register" className="login__registerButton">Create Account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
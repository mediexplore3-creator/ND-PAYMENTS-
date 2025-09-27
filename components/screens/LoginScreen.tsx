import React from 'react';
import { auth, provider, signInWithPopup } from '../../firebase';

const LoginScreen: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg p-4 text-center">
      <div className="bg-light-card dark:bg-dark-card p-8 sm:p-12 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to access your dashboard.</p>
        <button
          onClick={handleLogin}
          className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-6 h-6 mr-3" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;

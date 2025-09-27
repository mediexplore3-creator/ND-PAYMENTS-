import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import Card from '../ui/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { UPI_ID } from '../../constants';
import type { PaymentApp, Transaction } from '../../types';

interface ProfileScreenProps {
  user: User;
  handleSignOut: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, handleSignOut, theme, setTheme, setTransactions }) => {
  const [defaultApp, setDefaultApp] = useLocalStorage<PaymentApp>('defaultApp', 'generic');
  const [showToast, setShowToast] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const resetHistory = () => {
    if (window.confirm('Are you sure you want to delete all transaction history? This action cannot be undone.')) {
        setTransactions([]);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-lg mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
      </header>

      <Card className="mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={user.photoURL || `https://www.gravatar.com/avatar/?d=mp&s=150`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-brand-primary"
            />
          </div>

          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>

          <div className="mt-4 text-center">
            <p className="font-mono text-gray-600 dark:text-gray-400">{UPI_ID}</p>
            <button onClick={handleCopy} className="mt-1 text-sm text-brand-secondary hover:underline">Copy UPI ID</button>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label>Dark Mode</label>
            <button onClick={toggleTheme} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'dark' ? 'bg-brand-primary' : 'bg-gray-300'}`}>
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="defaultApp">Default Payment App</label>
            <select
                id="defaultApp"
                value={defaultApp}
                onChange={(e) => setDefaultApp(e.target.value as PaymentApp)}
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-1"
            >
                <option value="generic">Generic UPI</option>
                <option value="gpay">Google Pay</option>
                <option value="phonepe">PhonePe</option>
                <option value="paytm">Paytm</option>
                <option value="amazonpay">Amazon Pay</option>
                <option value="cred">Cred</option>
                <option value="mobikwik">MobiKwik</option>
            </select>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button 
                onClick={resetHistory}
                className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reset Transaction History
            </button>
          </div>
        </div>
      </Card>
      
      <Card>
         <button 
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </Card>

      {showToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
              UPI ID Copied!
          </div>
      )}
    </div>
  );
};

export default ProfileScreen;

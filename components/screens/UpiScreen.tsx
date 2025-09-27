import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import Card from '../ui/Card';
import { UPI_ID, QR_CODE_URL } from '../../constants';
import PaymentFlowModal from '../modals/PaymentFlowModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { PaymentApp, Transaction } from '../../types';

interface UpiScreenProps {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  user: User;
}

const UpiScreen: React.FC<UpiScreenProps> = ({ setTransactions, user }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [amountError, setAmountError] = useState('');
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [defaultApp] = useLocalStorage<PaymentApp>('defaultApp', 'generic');

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Prevent non-numeric characters except for one decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setAmount(value);

    if (value && parseFloat(value) <= 0) {
      setAmountError('Amount must be positive.');
    } else {
      setAmountError('');
    }
  };
  
  const handlePay = () => {
    if (!amount || parseFloat(amount) <= 0 || amountError) {
      alert('Please enter a valid amount.');
      return;
    }
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(user.displayName || 'Rakesh Payments')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || 'Payment via Dashboard')}`;
    
    // For desktop testing, we simulate the flow. On mobile, this would open the app.
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = upiLink;
    }
    
    setShowPaymentFlow(true);
  };

  return (
    <>
      <div className="p-4 sm:p-6 max-w-md mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Pay via UPI</h1>
        </header>
        <Card>
          <div className="flex flex-col items-center">
            <img src={QR_CODE_URL} alt="UPI QR Code" className="w-48 h-48 rounded-lg border-4 border-gray-300 dark:border-gray-600 mb-4" />
            <p className="font-mono text-center text-lg break-all">{UPI_ID}</p>
            <button
              onClick={handleCopy}
              className="mt-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold py-1 px-3 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Copy UPI ID
            </button>
          </div>

          <div className="mt-8">
            <label htmlFor="amount" className="block text-lg font-medium mb-2">Enter Amount (INR)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl">₹</span>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-3 text-2xl font-bold bg-gray-100 dark:bg-gray-800 border-2 rounded-lg transition-colors ${
                  amountError 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-transparent focus:border-brand-primary dark:focus:border-brand-primary'
                } focus:ring-0`}
              />
            </div>
            {amountError && <p className="mt-1 text-sm text-red-500">{amountError}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="note" className="block text-lg font-medium mb-2">Note (Optional)</label>
            <input
              id="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., For dinner"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-brand-primary dark:focus:border-brand-primary focus:ring-0 rounded-lg"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handlePay}
              className="w-full bg-brand-primary text-white text-xl font-bold py-4 rounded-lg shadow-lg hover:shadow-neon-green transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!amount || !!amountError}
            >
              Pay Now
            </button>
          </div>
        </Card>
      </div>
      {showPaymentFlow && (
        <PaymentFlowModal
          amount={parseFloat(amount)}
          note={note}
          onClose={() => {
            setShowPaymentFlow(false);
            setAmount('');
            setNote('');
            setAmountError('');
          }}
          setTransactions={setTransactions}
        />
      )}
      {showToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
              UPI ID Copied!
          </div>
      )}
    </>
  );
};

export default UpiScreen;

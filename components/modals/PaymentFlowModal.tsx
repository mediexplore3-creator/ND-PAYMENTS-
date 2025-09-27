import React, { useState, useEffect } from 'react';
import type { Transaction } from '../../types';
import { generateReceipt } from '../../services/pdfService';

interface PaymentFlowModalProps {
  amount: number;
  note?: string;
  onClose: () => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

type PaymentStatus = 'processing' | 'success' | 'failed';

const PaymentFlowModal: React.FC<PaymentFlowModalProps> = ({ amount, note, onClose, setTransactions }) => {
  const [status, setStatus] = useState<PaymentStatus>('processing');
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      const newTransaction: Transaction = {
        id: `TXN${Date.now()}`,
        amount,
        date: new Date().toISOString(),
        status: isSuccess ? 'Success' : 'Failed',
        note: note || undefined,
      };
      setTransaction(newTransaction);
      setTransactions(prev => [newTransaction, ...prev]);
      setStatus(isSuccess ? 'success' : 'failed');
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, note, setTransactions]);

  const handleDownloadReceipt = () => {
    if (transaction) {
      generateReceipt(transaction);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Processing Payment...</h2>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="bg-brand-secondary h-4 rounded-full animate-progress"></div>
            </div>
            <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Please wait, do not close this window.</p>
          </>
        );
      case 'success':
        return (
          <div className="text-center">
            <img src="https://www.svgrepo.com/show/475654/check-circle.svg" alt="Success" className="w-24 h-24 mx-auto mb-4 text-green-500" style={{ filter: 'grayscale(1) brightness(1.5) contrast(100) invert(48%) sepia(85%) saturate(1001%) hue-rotate(97deg) brightness(97%) contrast(89%)'}}/>
            <h2 className="text-3xl font-bold text-green-500 mb-2">Payment Successful!</h2>
            <p className="text-lg">Amount: ₹{amount.toFixed(2)}</p>
            {transaction?.note && <p className="text-md text-gray-500 dark:text-gray-300 mt-1">Note: {transaction.note}</p>}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Transaction ID: {transaction?.id}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleDownloadReceipt} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">Download Receipt</button>
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">Close</button>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="text-center">
            <img src="https://www.svgrepo.com/show/475653/close-circle.svg" alt="Failed" className="w-24 h-24 mx-auto mb-4 text-red-500" style={{ filter: 'grayscale(1) brightness(1.5) contrast(100) invert(22%) sepia(74%) saturate(7493%) hue-rotate(357deg) brightness(99%) contrast(128%)'}}/>
            <h2 className="text-3xl font-bold text-red-500 mb-2">Payment Failed</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Something went wrong. Please try again.</p>
            <div className="flex gap-4 justify-center">
                <button onClick={() => setStatus('processing')} className="bg-brand-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">Retry</button>
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">Close</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentFlowModal;
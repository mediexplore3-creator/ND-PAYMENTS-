import React from 'react';
import Card from '../ui/Card';
import type { Transaction } from '../../types';

interface HistoryScreenProps {
  transactions: Transaction[];
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ transactions }) => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Transaction History</h1>
      </header>
      <Card className="overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-3 font-mono text-sm text-gray-500 dark:text-gray-400 break-all">{tx.id}</td>
                  <td className="p-3 font-semibold">₹{tx.amount.toFixed(2)}</td>
                  <td className="p-3 text-sm">{new Date(tx.date).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                      tx.status === 'Success'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{tx.note || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryScreen;
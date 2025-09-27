import React from 'react';
import Card from '../ui/Card';
import type { Screen } from '../../types';
import type { User } from 'firebase/auth';

interface HomeScreenProps {
  setActiveScreen: (screen: Screen) => void;
  user: User;
}

const PaymentCard: React.FC<{
  title: string;
  logoUrl: string;
  onClick: () => void;
  className?: string;
}> = ({ title, logoUrl, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-4 text-center bg-light-card dark:bg-dark-card rounded-xl shadow-md 
      hover:shadow-lg dark:hover:shadow-neon-blue transform hover:-translate-y-1 transition-all duration-300
      ${className}
    `}
  >
    <div className="h-16 flex items-center justify-center mb-3">
       <img src={logoUrl} alt={`${title} logo`} className="max-h-12 w-auto object-contain" />
    </div>
    <span className="font-semibold text-base">{title}</span>
  </button>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveScreen, user }) => {
  const paymentApps = [
    { name: 'Google Pay', logo: 'https://www.svgrepo.com/show/355035/google-pay.svg' },
    { name: 'PhonePe', logo: 'https://www.svgrepo.com/show/376333/phonepe.svg' },
    { name: 'Paytm', logo: 'https://www.svgrepo.com/show/354146/paytm.svg' },
    { name: 'Amazon Pay', logo: 'https://www.svgrepo.com/show/452140/amazon-pay.svg' },
    { name: 'Navi', logo: 'https://i.postimg.cc/yYx0S528/navi-icon.png' },
    { name: 'BHIM UPI', logo: 'https://www.svgrepo.com/show/398328/bhim-upi-icon.svg' },
    { name: 'Cred', logo: 'https://www.svgrepo.com/show/376251/cred.svg' },
    { name: 'MobiKwik', logo: 'https://www.svgrepo.com/show/354069/mobikwik.svg' },
    { name: 'All UPI Apps', logo: 'https://www.svgrepo.com/show/452158/upi.svg' }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome,</h1>
        <h2 className="text-4xl sm:text-5xl font-bold text-brand-primary truncate">{user.displayName || 'User'}!</h2>
      </header>

      <Card>
        <h3 className="text-2xl font-semibold mb-6">Quick Pay</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {paymentApps.map(app => (
            <PaymentCard 
              key={app.name} 
              title={app.name} 
              logoUrl={app.logo} 
              onClick={() => setActiveScreen('upi')} 
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeScreen;

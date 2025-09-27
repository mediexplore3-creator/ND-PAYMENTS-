import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import HomeScreen from './components/screens/HomeScreen';
import UpiScreen from './components/screens/UpiScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import LoginScreen from './components/screens/LoginScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Screen, Transaction } from './types';
import { auth, onAuthStateChanged, signOut } from './firebase';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderScreen = () => {
    // This function is only called when user is not null
    const currentUser = user!;
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} user={currentUser} />;
      case 'upi':
        return <UpiScreen setTransactions={setTransactions} user={currentUser} />;
      case 'history':
        return <HistoryScreen transactions={transactions} />;
      case 'profile':
        return <ProfileScreen 
                  user={currentUser} 
                  handleSignOut={() => signOut(auth)} 
                  theme={theme} 
                  setTheme={setTheme} 
                  setTransactions={setTransactions} 
                />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} user={currentUser} />;
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen font-sans text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <main className="pb-20">
        <div className="animate-fade-in">
          {renderScreen()}
        </div>
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
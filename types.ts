export type Screen = 'home' | 'upi' | 'history' | 'profile';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'Success' | 'Failed';
  note?: string;
}

export type PaymentApp = 'gpay' | 'phonepe' | 'paytm' | 'amazonpay' | 'cred' | 'mobikwik' | 'generic';
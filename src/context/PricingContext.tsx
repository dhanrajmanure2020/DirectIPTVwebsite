import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_PRICING_DATA = {
  1: {
    '1 Month': { price: 15.99, sub: '' },
    '3 Months': { price: 39.99, sub: '' },
    '6 Months': { price: 59.99, sub: '' },
    '12 Months': { price: 89.99, sub: '' },
    '24 Months': { price: 164.99, sub: '' }
  },
  2: {
    '1 Month': { price: 24.99, sub: '' },
    '3 Months': { price: 59.99, sub: '' },
    '6 Months': { price: 89.99, sub: '' },
    '12 Months': { price: 164.99, sub: '' },
    '24 Months': { price: 269.99, sub: '' }
  },
  3: {
    '1 Month': { price: 35.99, sub: '' },
    '3 Months': { price: 84.99, sub: '' },
    '6 Months': { price: 129.99, sub: '' },
    '12 Months': { price: 219.99, sub: '' },
    '24 Months': { price: 359.99, sub: '' }
  }
};

type PricingData = Record<number, Record<string, { price: number; sub: string }>>;

type PricingContextType = {
  pricingData: PricingData;
  updatePricingData: (newData: PricingData) => void;
  devices: number;
  setDevices: (num: number) => void;
  selectedPlanName: string;
  setSelectedPlanName: (name: string) => void;
  getPlanPrice: (planName: string, deviceCount?: number) => number;
  getPlanSub: (planName: string, deviceCount?: number) => string;
  currency: string;
  updateCurrency: (symbol: string) => void;
  isLoading: boolean;
  refetchPlans: () => Promise<void>;
};

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [pricingData, setPricingData] = useState<PricingData>(DEFAULT_PRICING_DATA);
  const [currency, setCurrency] = useState('$');
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/subscription-plans');
      if (res.ok) {
        const plans = await res.json();
        if (plans && plans.length > 0) {
          const newData: PricingData = {};
          plans.forEach((plan: any) => {
            if (!newData[plan.devices]) {
              newData[plan.devices] = {};
            }
            newData[plan.devices][plan.duration] = {
              price: Number(plan.price),
              sub: plan.sub_text || ''
            };
          });
          setPricingData(newData);
        } else {
          // Fallback to local storage or defaults if empty DB (or initial setup)
          const l = localStorage.getItem('iptv_pricing_data');
          if (l) setPricingData(JSON.parse(l));
        }
      }
    } catch (e) {
      console.error('Failed to fetch plans', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    const curr = localStorage.getItem('iptv_currency');
    if (curr) setCurrency(curr);
  }, []);

  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem('iptv_devices');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [selectedPlanName, setSelectedPlanName] = useState(() => {
    const saved = localStorage.getItem('iptv_plan');
    return saved || '6 Months';
  });

  const updatePricingData = (newData: PricingData) => {
    setPricingData(newData);
    localStorage.setItem('iptv_pricing_data', JSON.stringify(newData));
  };
  
  const updateCurrency = (symbol: string) => {
    setCurrency(symbol);
    localStorage.setItem('iptv_currency', symbol);
  };

  useEffect(() => {
    if (devices) {
      localStorage.setItem('iptv_devices', devices.toString());
    }
  }, [devices]);

  useEffect(() => {
    if (selectedPlanName) {
      localStorage.setItem('iptv_plan', selectedPlanName);
    }
  }, [selectedPlanName]);

  const getPlanPrice = (planName: string, deviceCount: number = devices) => {
    const plan = pricingData[deviceCount]?.[planName];
    return plan ? plan.price : 0;
  };

  const getPlanSub = (planName: string, deviceCount: number = devices) => {
    const plan = pricingData[deviceCount]?.[planName];
    return plan ? plan.sub : '';
  };

  return (
    <PricingContext.Provider value={{ 
      pricingData, updatePricingData, 
      currency, updateCurrency,
      devices, setDevices, 
      selectedPlanName, setSelectedPlanName, 
      getPlanPrice, getPlanSub,
      isLoading, refetchPlans: fetchPlans
    }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}

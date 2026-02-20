// React aur required hooks import kar rahe hain
import React, { createContext, useContext, useRef, useState } from "react";

// Context ke data ka type define kar rahe hain
interface ApiLoadingContextType {
  loading: boolean;        // Loader currently active hai ya nahi
  startLoading: () => void; // Loader start karne ka function
  stopLoading: () => void;  // Loader stop karne ka function
}

// Context create kar rahe hain (initial value undefined)
const ApiLoadingContext = createContext<ApiLoadingContextType | undefined>(
  undefined
);

// Provider component jo pure app ko wrap karega
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  // Loader state (true = show loader, false = hide loader)
  const [loading, setLoading] = useState(false);

  // Ek ref jo track karega kitni API requests chal rahi hain
  // useRef use kiya kyunki isse re-render nahi hota
  const requestCount = useRef(0);

  // ================= START LOADING =================

  const startLoading = () => {

    // Har API call start hone par count +1
    requestCount.current += 1;

    // Loader ko true kar do
    setLoading(true);
  };

  // ================= STOP LOADING =================

  const stopLoading = () => {

    // Jab API call complete ho jaye to count -1
    requestCount.current -= 1;

    // Agar koi bhi request pending nahi hai
    if (requestCount.current <= 0) {

      // Safety ke liye 0 set kar diya
      requestCount.current = 0;

      // Loader band kar do
      setLoading(false);
    }
  };

  // Context provider return kar rahe hain
  return (
    <ApiLoadingContext.Provider
      value={{ loading, startLoading, stopLoading }}
    >
      {/* App ke children components yaha render honge */}
      {children}
    </ApiLoadingContext.Provider>
  );
};

// Custom hook jo context ko easily use karne deta hai
export const useApiLoading = () => {

  const context = useContext(ApiLoadingContext);

  // Agar provider ke bahar use kiya gaya ho to error throw kare
  if (!context) {
    throw new Error("useApiLoading must be used inside ApiLoadingProvider");
  }

  return context;
};
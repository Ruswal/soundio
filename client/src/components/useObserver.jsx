// useObserver.js
import { useEffect, useRef } from "react";

const useObserver = () => {
  const observers = useRef([]);

  const subscribe = (callback) => {
    observers.current.push(callback);
  };

  const unsubscribe = (callback) => {
    observers.current = observers.current.filter(
      (observer) => observer !== callback
    );
  };

  const notify = () => {
    observers.current.forEach((observer) => observer());
  };

  useEffect(() => {
    return () => {
      observers.current = []; // Clean up observers on unmount
    };
  }, []);

  return { subscribe, unsubscribe, notify };
};

export default useObserver;

import React, { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
    
    };
   
    
    return () => {
    
     
    };
  }, [ref, handler]);
};

export default useOnClickOutside;

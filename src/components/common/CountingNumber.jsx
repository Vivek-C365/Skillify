import React, { useEffect, useState } from "react";

const CountingNumber = ({ maxnumber , timer }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prevNumber) => {
        if (prevNumber >= maxnumber) {
          clearInterval(interval);
          return prevNumber;
        }
        return prevNumber + 1;
      });
    }, timer);

    return () => clearInterval(interval);
  }, [maxnumber , timer]);


  return <div>{number}</div>;
};

// 
export default CountingNumber;

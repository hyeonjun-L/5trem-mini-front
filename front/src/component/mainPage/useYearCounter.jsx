import React, { useState } from "react";

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increaseCount = () => setCount((count) => Math.min(count + 1, 2100));
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 1970));

  return [count, increaseCount, decreaseCount, setCount];
}

export default useCounter;

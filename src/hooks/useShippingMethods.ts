const useShippingMethods = () => {
  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 5.00 },
    { id: 'express', name: 'Express Shipping', price: 15.00 },
  ];

  return shippingMethods;
};

export default useShippingMethods;
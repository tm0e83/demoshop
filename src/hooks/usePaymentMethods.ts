const usePaymentMethods = () => {
  const paymentMethods = [
    { id: 'prepayment', name: 'Prepayment' },
    { id: 'paypal', name: 'PayPal' },
  ];
  return paymentMethods;
};

export default usePaymentMethods;
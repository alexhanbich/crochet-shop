function round(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export default function calc(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.cnt,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    itemsPrice: round(itemsPrice),
    shippingPrice: round(shippingPrice),
    taxPrice: round(taxPrice),
    totalPrice: round(totalPrice),
  };
}

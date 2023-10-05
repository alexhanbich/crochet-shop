export const round = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = round(
    state.cartItems.reduce((acc, i) => acc + i.price * i.cnt, 0)
  );
  state.shippingPrice = round(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = round(Number((0.15 * state.itemsPrice).toFixed(2)));
  state.totalPrice = round(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  );
  localStorage.setItem("cart", JSON.stringify(state));
};

export const date = (dateStr) => {
  return new Date(dateStr).toLocaleString();

}
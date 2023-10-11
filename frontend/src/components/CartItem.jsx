import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { LiaTrashAlt } from "react-icons/lia";

const CartItem = (props) => {
  const product = props.product;
  const canEdit = props.canEdit;
  const dispatch = useDispatch();
  const addToCartHandler = async (item, cnt) => {
    dispatch(addToCart({ ...item, cnt }));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          src={product.image}
          alt="image"
          className="h-32 w-32 rounded object-cover"
        />
        <div>
          <h3 className="text-lg">{product.name}</h3>
        </div>
        <div>
        <h3 className="text-lg font-body2 font-medium">${product.price.toFixed(2)}</h3>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <select
            disabled={!canEdit}
            value={product.cnt}
            onChange={(i) => addToCartHandler(product, Number(i.target.value))}
            className={`py-2 px-2 border w-fit h-fit focus:outline-none ${canEdit ? '' : 'appearance-none'}`}
          >
            {[...Array(product.numStock).slice(0, 9)].map((_, i) => {
              return (
                <option key={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <button className="text-xl text-gray transition hover:text-red">
            <LiaTrashAlt onClick={() => removeFromCartHandler(product._id)} />
          </button>
        </div>
      </div>
      <hr className="text-lightgray"/>
    </div>
  );
};

export default CartItem;

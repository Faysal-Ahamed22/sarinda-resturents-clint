import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";

const RecomendCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const handleAddToCart = food => {
    if (user && user.email) {
      console.log(food);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name, image, price
      }
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: 'success',
              title: 'Added to cart',
              text: `${name} has been added to your cart.`,
              confirmButtonColor: '#f59e0b'
            });
          }
        })

    }
    else {
      Swal.fire({
        title: 'Please log in',
        text: 'You must log in to add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'Login',
        confirmButtonColor: '#f59e0b'
      });
      navigate('/login');
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="h-44 w-full overflow-hidden sm:h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="px-5 py-5 text-center sm:px-6 sm:py-6">
        <h2 className="text-base font-semibold text-base-content sm:text-lg">
          {name}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-base-content/70">
          {recipe}
        </p>

        <p className="mt-3 text-lg font-bold text-amber-600 sm:text-xl">
          ${price.toFixed(2)}
        </p>

        <button onClick={() => handleAddToCart(item)}
          className="btn btn-sm mt-5 w-full border-none bg-base-100 text-amber-600 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-amber-600 hover:text-white hover:shadow-lg sm:w-auto">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default RecomendCard;
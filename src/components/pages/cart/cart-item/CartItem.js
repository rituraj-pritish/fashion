import React from 'react';
import LazyLoad from 'react-lazy-load';
import { connect } from 'react-redux';

import Icon from '../../../common/Icon';
import Text from '../../../common/Text';
import PlusIcon from '../../../../assets/icons/PlusIcon';
import TrashIcon from '../../../../assets/icons/TrashIcon';
import MinusIcon from '../../../../assets/icons/MinusIcon';
import {
  CartItemContainer,
  Quantity,
  Details,
  Remove
} from './CartItem.styles';
import {
  updateCart,
  removeFromCart,
  removeFromWishlist
} from '../../../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const CartItem = ({
  page,
  item,
  updateCart,
  removeFromCart,
  removeFromWishlist
}) => {
  const {
    product: { variants, name, category, id },
    variant,
    qty
  } = item;
  const imageUrl = variants[variant].images[0];
  const price = variants[variant].price;

  const handleRemove = () => {
    if (page === 'cart') {
      removeFromCart(item.product);
    } else {
      removeFromWishlist(item.product.id);
    }
  };

  return (
    <CartItemContainer>
      <LazyLoad className='lazyload'>
        <Link to={`/product/${category}/${id}`}>
          <img src={imageUrl} alt={name} />
        </Link>
      </LazyLoad>

      <Details>
        <p>{name}</p>

        {qty && (
          <Quantity>
            <Icon
              m='5px'
              p='5px'
              onClick={() => {
                if (qty === 1) return;
                updateCart(item.product, qty - 1);
              }}
            >
              <MinusIcon />
            </Icon>
            <Text m='5px' p='5px' mb='8px'>
              {qty}
            </Text>
            <Icon
              m='5px'
              p='5px'
              onClick={() => updateCart(item.product, qty + 1)}
            >
              <PlusIcon />
            </Icon>
          </Quantity>
        )}
      </Details>

      <Text fontWeight='bold'>
        $ {qty ? (Math.round(qty * price * 100) / 100).toFixed(2) : price}
      </Text>

      <Remove onClick={handleRemove} className='far fa-trash-alt'>
        <Icon width='16px'>
          <TrashIcon />
        </Icon>
      </Remove>
    </CartItemContainer>
  );
};

export default connect(null, {
  updateCart,
  removeFromCart,
  removeFromWishlist
})(CartItem);
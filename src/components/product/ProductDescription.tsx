import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { ProductType } from '../../types/Product';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AppState, useAppDispatch } from '../../redux/store';
import { addItem } from '../../redux/slices/CartSlice';
import { getLoggedUserInfo } from '../../redux/slices/UserSlice';

const ProductDescription = ({ productData }: { productData: ProductType }) => {
  const [itemNumber, setItemNumber] = useState<number>(1);
  const dispatch = useAppDispatch();

  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const removeHandler = () => {
    setItemNumber((prevItem) => (prevItem !== 1 ? prevItem - 1 : prevItem));
  };

  const addHandler = () => {
    setItemNumber(itemNumber + 1);
  };

  const addToCartHandler = (item: ProductType) => {
    dispatch(addItem({ ...item, amount: itemNumber }));
  };

  useEffect(() => {
    if (!loggedUserInfo) {
      dispatch(getLoggedUserInfo());
    }
  }, [loggedUserInfo, dispatch]);

  return (
    <div className='sm:flex-1 p-3 md:p-5 text-color-primary sm:self-start'>
      <h1 className='text-xl md:text-2xl font-medium pb-4 mb-5 border-b border-color-primary tracking-wide'>
        {productData?.title}
      </h1>
      <span className='text-xl font-bold block mb-5'>
        <span className='text-sm'>As low as</span> €{' '}
        {productData.price.toFixed(2)}
      </span>
      <p className='tracking-wider mb-8'>{productData.description}</p>
      {loggedUserInfo && loggedUserInfo.role === 'customer' && (
        <div className='flex gap-4'>
          <div className='flex border border-color-primary items-center gap-x-4 py-4 px-6 rounded-xl'>
            <span
              className='icon-minus cursor-pointer text-color-primary'
              role='button'
              onClick={removeHandler}
            >
              <FontAwesomeIcon icon={faMinus} className='text-lg' />
            </span>
            <p className='w-4 text-center select-none font-medium'>
              {itemNumber}
            </p>
            <input type='hidden' name='quantity' value='1' />
            <span
              className='icon-plus cursor-pointer text-color-primary'
              role='button'
              onClick={addHandler}
            >
              <FontAwesomeIcon icon={faPlus} className='text-lg' />
            </span>
          </div>
          <button
            className='btn-primary w-full max-w-full rounded-xl'
            type='submit'
            onClick={() => addToCartHandler(productData)}
          >
            Add To Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

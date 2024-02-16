import React from 'react';

import Banner from '../components/banner/Banner';
import ProductHighlights from '../components/productHighlights/ProductHighlights';
import Newsletter from '../components/newsletter/Newsletter';

const Home = () => {
  return (
    <>
      <Banner />
      <ProductHighlights />
      <Newsletter />
    </>
  );
};

export default Home;

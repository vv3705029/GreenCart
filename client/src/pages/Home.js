import React from 'react'
import MainBanner from '../components/MainBanner.js'
import Categories from '../components/Categories.js';
import Bestseller from '../components/Bestseller.js';
import BottomBanner from '../components/BottomBanner.js';
import NewsLetter from '../components/NewsLetter.js';

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <Bestseller/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home;

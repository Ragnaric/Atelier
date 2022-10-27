import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';

import { URL } from '../../../config/config.js';

const RatingsReviews = ({productID}) =>{
  /**
   * Only render Ratings and Reviews once we get a product for which we need to render reviews for
   */
  const [reviews, setReviews] = useState();

  /**
   * On render, try and get reviews using the productID
   */
  useEffect(() => {
    axios.get(`reviews?product_id=${productID}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  /**
   * Retrieve reviews from API passing a specified sort parameter
   */
  const sortReviews = (sortBy) => {
    axios.get(`reviews?product_id=${productID}&sort=${sortBy}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /**
   * Only render Ratings and Reviews once we get reviews to render
   */
  return reviews ? (
    <div style={{margin: '0 10rem 0 10rem'}}>
      <h1 style={{margin: '40px 0 10px 0'}}>
        RatingsReviews
      </h1>
      <div className="ratings-reviews">
        <Summary productID={productID} reviews={reviews}/>
        <Reviews productID={productID} reviews={reviews} handleSetSort={sortReviews}/>
      </div>
    </div>
  ) : <></>;
};
export default RatingsReviews;
import React, { useState } from 'react';
import Slider from 'react-slick';
import { API_URL } from '../../../constants';
import './style.css';

const ImageSlider = ({ data}) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	

	return (
		<div className="slider">
			<Slider {...settings}>
				{data &&
					data.map((item, index) => (
						<div className="slider_wrapper">
							<img className="slider__image" key={index} src={item.image} alt="banner" />
						</div>
					))}
			</Slider>
		</div>
	);
};

export default ImageSlider;

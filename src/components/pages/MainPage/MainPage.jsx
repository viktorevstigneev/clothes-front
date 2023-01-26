import React, { useEffect, useState } from 'react';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider'


import { COLORS_FILTER, TYPE_FILTER } from './data';
import './style.css';
import { API_URL } from '../../../constants';
import { sliderData } from './data';

const MainPage = () => {
	return (
		<>
			<main className="home__main">
				<Slider data={sliderData}/>
			</main>
			<Footer />
		</>
	);
};

export default MainPage;

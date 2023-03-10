import React from 'react';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider';

import './style.css';

import { sliderData } from './data';

const MainPage = () => {
	return (
		<>
			<main className="home__main">
				<Slider data={sliderData} />
			</main>
			<Footer />
		</>
	);
};

export default MainPage;

import React, { useCallback, useEffect, useState } from 'react';
import DoubleSlider from 'double-slider';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider';

import { clothesType, sexType, cardData } from './data';
import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../../common/Modal';
import { FormattedMessage } from 'react-intl';

const ClothesPage = () => {
	const [isFiltersModalOpen, setFilterModalOpen] = useState(false);
	const [sliderMin, setMin] = useState(0);
	const [sliderMax, setMax] = useState(100);
	const [activeCard, setActiveCard] = useState();
	const [showCard, setShowCard] = useState(false);

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setFilterModalOpen(false);
		setShowCard(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setFilterModalOpen(false);
			setShowCard(false);
		}
	}, []);

	useEffect(() => {
		const mySlider = new DoubleSlider(document.getElementById('my-slider'));


		mySlider.addEventListener('slider:change', () => {
			const { min, max } = mySlider.value;
			setMin(min || 0);
			setMax(max || 100);
			console.log(`Min is: ${min}, max is: ${max}`);
		});

		// return () => {
		// 	mySlider.removeEventListener('slider:change', handleChange);
		// };
	}, []);

	

	

	return (
		<>
			<main className="clothes">
				<div className="clothes__container">
					<div className="Clothes__top">
						<p
							className="clothes__filter"
							onClick={() => {
								setFilterModalOpen(true);
							}}
						>
							<FormattedMessage id="filters__btn" />
						</p>
						<p className="clothes__title">
							<FormattedMessage id="clothes__title" />
						</p>
					</div>

					<div className="clothes__content">
						{cardData.map((item) => (
							<div
								className="clothes__card"
								onClick={() => {
									setActiveCard(item);
									setShowCard(true);
								}}
							>
								<img className="clothes__img" src={item.image} alt="" />
								<div className="clothes__bottom">
									<p className="clothes__price">Price: {item.price}$</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			{/* <Footer /> */}
			<Modal
				style={{ with: !isFiltersModalOpen && '0', height: !isFiltersModalOpen && '0' }}
				title={<FormattedMessage id="filters__btn" />}
				onCloseButtonClick={handleModalWindowCloseButtonClick}
				onOverlayClick={handleModalWindowOverlayClick}
			>
				<div className="filter__block">
					<h2 className="filter__title">Price Filter</h2>
					<div id="my-slider" data-min="0" data-max="100" data-range="100"></div>
					<div className="filter__price">
						<div className="filter__cost">{sliderMin}$</div>
						<div className="filter__cost">{sliderMax}$</div>
					</div>
				</div>
				<div className="filter__block">
					<h2 className="filter__title">Clothes type</h2>
					<div className="filter__wrapper">
						{clothesType.map(({ id }) => (
							<div className="filter__item">
								<input className="filter__checkbox" type="checkbox" id={id} name={id} />
								<label htmlFor={id}>{id}</label>
							</div>
						))}
					</div>
				</div>

				<div className="filter__block">
					<h2 className="filter__title">Sex</h2>
					<div className="filter__wrapper">
						{sexType.map(({ id }) => (
							<div className="filter__item">
								<input className="filter__checkbox" type="checkbox" id={id} name={id} />
								<label htmlFor={id}>{id}</label>
							</div>
						))}
					</div>
				</div>

				<button className="filter__apply">Apply</button>
			</Modal>

			{showCard && (
				<Modal
					title={<FormattedMessage id="filters__btn" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<img className="clothes__img" src={activeCard.image} alt="" />
					<div className="clothes__bottom">
						<p className="clothes__price">Price: {activeCard.price}$</p>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ClothesPage;

import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../Modal';
import Banner from './Banner';
import './style.css';

import ban1 from '../../../img/ban_1.png';
import ban2 from '../../../img/ban_2.png';
import axios from 'axios';

const bannerData = [
	{
		image: ban1,
	},
	{
		image: ban2,
	},
];

const ImageSlider = ({ data }) => {
	const [isPopupEditOpen, setPopupEditOpen] = useState(false);
	const [user, setUser] = useState();

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setPopupEditOpen(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setPopupEditOpen(false);
		}
	}, []);

	console.log('bannerData: ', bannerData);

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	return (
		<div className="slider">
			{user && user.isAdmin ? <p
				className="slider__edit-btn"
				onClick={() => {
					setPopupEditOpen(true);
				}}
			>
				<FormattedMessage id="edit_slider_btn" />
			</p> : ''}
			<Slider {...settings}>
				{data &&
					data.map((item, index) => (
						<div className="slider_wrapper">
							<img className="slider__image" key={index} src={item.image} alt="banner" />
						</div>
					))}
			</Slider>

			{isPopupEditOpen && (
				<Modal
					title={<FormattedMessage id="edit_slider_title" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<div className="banner__container">
						{bannerData.map((item) => (
							<Banner image={item.image} />
						))}
						<Banner isDashed={true} />
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ImageSlider;

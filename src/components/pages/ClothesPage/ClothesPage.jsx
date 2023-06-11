import React, { useCallback, useEffect, useState } from 'react';
import DoubleSlider from 'double-slider';

// import Footer from '../../common/Footer';

import { clothesType, sexType } from './data';
import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../../common/Modal';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

const ClothesPage = () => {
	const [user, setUser] = useState();
	const [isFiltersModalOpen, setFilterModalOpen] = useState(false);
	const [sliderMin, setMin] = useState(0);
	const [sliderMax, setMax] = useState(500);
	const [activeCard, setActiveCard] = useState();
	const [showCard, setShowCard] = useState(false);
	const [showCardEdit, setShowCardEdit] = useState(false);
	const [cardData, setCardData] = useState();

	const [filteredCards, setFilteredCards] = useState();

	const [filter, setFilter] = useState({
		maxPrice: 100,
		minPrice: 0,
		// sex: ['Female', 'Male'],
		// type: ['Blouses', 'Shirts', 'Pants', 'Dresses', 'Skirts', 'Outerwear'],
		sex: [],
		type: [],
	});

	console.log('filter: ', filter);

	const [cardPrice, setCardPrice] = useState(activeCard && activeCard?.price);
	const [cardName, setCardName] = useState(activeCard && activeCard?.name);
	const [cardDesc, setCardDesc] = useState(activeCard && activeCard?.description);
	const [file, setFile] = useState('');

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	useEffect(() => {
		const getClothes = async () => {
			const responseData = await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
				setCardData(response.data);
				setFilteredCards(response.data);
			});
		};
		getClothes();
	}, []);

	useEffect(() => {
		const mySlider = new DoubleSlider(document.getElementById('my-slider'));

		mySlider.addEventListener('slider:change', () => {
			const { min, max } = mySlider.value;
			setMin(min || 0);
			setMax(max || 500);
			setFilter({
				...filter,
				minPrice: min,
				maxPrice: max,
			});
		});
		// return () => {
		// 	mySlider.removeEventListener('slider:change', handleChange);
		// };
	}, []);

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setFilterModalOpen(false);
		setShowCard(false);
		setShowCardEdit(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setFilterModalOpen(false);
			setShowCard(false);
			setShowCardEdit(false);
		}
	}, []);

	const filterArray = (arr) => {
		let newArr = arr && arr.filter((item) => item.price > filter.minPrice && item.price < filter.maxPrice);

		newArr = newArr.filter((item) => (filter.type.length == 0 ? item : filter.type.includes(item.typeClothes)));

		newArr = newArr.filter((item) => (filter.sex.length == 0 ? item : filter.sex.includes(item.sexThing)));

		return newArr;
	};

	const handleApplyFilters = (evt) => {
		evt.preventDefault();

		setFilteredCards(filterArray(cardData));
	};
	console.log('cardData: ', cardData);

	console.log('filteredCards: ', filteredCards);

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
						{filteredCards &&
							filteredCards.map((item) => (
								<div
									className="clothes__card"
									onClick={() => {
										setActiveCard(item);
										setCardPrice(item.price);
										setCardDesc(item.description);
										setCardName(item?.name);
										setShowCard(true);
									}}
								>
									{user && user.isAdmin && (
										<span
											className="clothes_card--delete"
											onClick={async (event) => {
												event.stopPropagation();
												await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
											}}
										>
											&times;
										</span>
									)}
									<img className="clothes__img" src={`${API_URL}/getImage/${item.avatar}`} alt="" />
									<div className="clothes__bottom">
										<p className="clothes__price">
											<FormattedMessage id="clothes__price__title" />: {item.price}$
										</p>
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
				<form action="" onSubmit={handleApplyFilters}>
					<div className="filter__block">
						<h2 className="filter__title">
							<FormattedMessage id="filter__price" />
						</h2>
						<div id="my-slider" data-min="0" data-max="500" data-range="500"></div>
						<div className="filter__price">
							<div className="filter__cost">{sliderMin}$</div>
							<div className="filter__cost">{sliderMax}$</div>
						</div>
					</div>
					<div className="filter__block">
						<h2 className="filter__title">
							<FormattedMessage id="filter__type" />
						</h2>
						<div className="filter__wrapper">
							{clothesType.map(({ id, translate }) => (
								<div className="filter__item">
									<input
										className="filter__checkbox"
										onChange={(evt) => {
											const newArr = filter.type;

											if (evt.target.checked) {
												newArr.push(evt.target.name);
												let set = new Set(newArr);

												setFilter({
													...filter,
													type: Array.from(set),
												});
											} else {
												newArr.pop(evt.target.name);
												let set = new Set(newArr);

												setFilter({
													...filter,
													type: Array.from(set),
												});
											}

											// if (filter.type.length == 0) {
											// 	setFilter({
											// 		...filter,
											// 		type: ['Blouses', 'Shirts', 'Pants', 'Dresses', 'Skirts', 'Outerwear'],
											// 	});
											// }
										}}
										type="checkbox"
										id={id}
										name={id}
									/>
									<label htmlFor={id}>{translate}</label>
								</div>
							))}
						</div>
					</div>

					<div className="filter__block">
						<h2 className="filter__title">
							<FormattedMessage id="filter__sex" />
						</h2>
						<div className="filter__wrapper">
							{sexType.map(({ id, translate }) => (
								<div className="filter__item">
									<input
										className="filter__checkbox"
										onChange={(evt) => {
											const newArr = filter.sex;

											if (evt.target.checked) {
												newArr.push(evt.target.name);
												let set = new Set(newArr);

												setFilter({
													...filter,
													sex: Array.from(set),
												});
											} else {
												newArr.pop(evt.target.name);
												let set = new Set(newArr);

												setFilter({
													...filter,
													sex: Array.from(set),
												});
											}
											// if (filter.type.length == 0) {
											// 	setFilter({
											// 		...filter,
											// 		sex: ['Female', 'Male'],
											// 	});
											// }
										}}
										type="checkbox"
										id={id}
										name={id}
									/>
									<label htmlFor={id}>{translate}</label>
								</div>
							))}
						</div>
					</div>

					<button className="filter__apply">
						<FormattedMessage id="filter__apply" />
					</button>
				</form>
			</Modal>

			{showCard && (
				<Modal onCloseButtonClick={handleModalWindowCloseButtonClick} onOverlayClick={handleModalWindowOverlayClick}>
					<div className="open__block">
						{user && user.isAdmin && (
							<p
								className="open__edit__card"
								onClick={() => {
									setShowCard(false);
									setShowCardEdit(true);
								}}
							>
								<FormattedMessage id="edit_slider_btn" /> &#9998;
							</p>
						)}
						<div className="open__container">
							<img className="open__img" src={`${API_URL}/getImage/${activeCard.avatar}`} alt="" />
							<div className="">
								<p className="open__description"> {activeCard?.name}</p>
								<p className="open__description"> {activeCard?.description}</p>
							</div>
						</div>
						<div className="open__bottom">
							<p className="open__price">
								<FormattedMessage id="clothes__price__title" />: {activeCard.price}$
							</p>
							{user && user ? (
								<p
									className="open__cart"
									onClick={async () => {
										await axios.patch(`${API_URL}/profile`, { productID: activeCard._id, userID: user._id });
										window.location.reload();
									}}
								>
									&#128722;
								</p>
							) : (
								<p className="open__cart-no">
									<FormattedMessage id="cart__bin" />
								</p>
							)}
						</div>
					</div>
				</Modal>
			)}

			{showCardEdit && (
				<Modal onCloseButtonClick={handleModalWindowCloseButtonClick} onOverlayClick={handleModalWindowOverlayClick}>
					<form
						className="open__block"
						encType="multipart/form-data"
						method="POST"
						onSubmit={async (evt) => {
							evt.preventDefault();

							const formData = new FormData(evt.target);

							const responseData = await axios({
								method: 'PATCH',
								url: `${API_URL}/team/${activeCard._id}`,
								data: formData,
								withCredentials: true,
							});
							window.location.reload();
						}}
					>
						<div className="open__container">
							<div className="e__block">
								<label className="e__label" htmlFor="avatar">
									<img
										className="e__avatar"
										src={file ? URL.createObjectURL(file) : `${API_URL}/getImage/${activeCard.avatar}`}
										alt="menu_picture"
									/>
									<div className="e__icon">&#128449;</div>
								</label>
								<input
									className="e__input"
									id="avatar"
									name="avatar"
									type="file"
									onChange={(evt) => setFile(evt.target.files[0])}
								/>
							</div>
							<div className="">
								<input
									style={{ marginBottom: '20px' }}
									type="text"
									name="name"
									value={cardName}
									onChange={(evt) => {
										setCardName(evt.target.value);
									}}
								/>
								<textarea
									className="open__description"
									style={{ resize: 'none', width: '100%' }}
									type="text"
									name="description"
									onChange={(evt) => {
										setCardDesc(evt.target.value);
									}}
									value={cardDesc}
								></textarea>
							</div>
						</div>
						<div className="open__bottom">
							<p className="open__price">
								<FormattedMessage id="clothes__price__title" />:{' '}
								<input
									type="text"
									name="price"
									onChange={(evt) => {
										setCardPrice(evt.target.value);
									}}
									value={cardPrice}
								/>
								$
							</p>
						</div>

						<button className="edit__button" type="submit">
							<FormattedMessage id="edit_btn" />
						</button>
					</form>
				</Modal>
			)}
		</>
	);
};

export default ClothesPage;

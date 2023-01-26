import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import axios from 'axios';

import Modal from '../Modal';
import InputIntl from '../InputIntl/InputIntl';

import logo from '../../../img/logo.png';
import inst from '../../../img/inst_icon.png';
import tg from '../../../img/tg_icon.png';
import viber from '../../../img/viber_icon.png';
import profile from '../../../img/profile_icon.png';
import authDefault from '../../../img/user_default.png';

import { POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import './style.css';

import { API_URL } from '../../../constants';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';

const Header = ({ handleChange, currentLocale }) => {
	const [user, setUser] = useState();
	const [isPopupRegistrOpen, setPopupRegistrOpen] = useState(false);
	const [isPopupAuthOpen, setPopupAuthOpen] = useState(false);

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	const languages = [
		{ name: 'English', code: LOCALES.ENGLISH },
		{ name: 'Русский', code: LOCALES.RUSSIAN },
	];

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setPopupRegistrOpen(false);
		setPopupAuthOpen(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setPopupRegistrOpen(false);
			setPopupAuthOpen(false);
		}
	}, []);

	return (
		<header className="header">
			<div className="header__container">
				<img className="header__logo" src={logo} alt="logo" />

				<div className="header__nav-left">
					<Link className="header__link" to="/">
						<FormattedMessage id="home_link" />
					</Link>
					<Link className="header__link" to="/contact">
						<FormattedMessage id="clothes_link" />
					</Link>
					<Link className="header__link" to="/main">
						<FormattedMessage id="accessories_link" />
					</Link>
					<Link className="header__link" to="/main">
						<FormattedMessage id="bijouterie_link" />
					</Link>
					<Link className="header__link" to="/main">
						<FormattedMessage id="shoes_link" />
					</Link>
					<div className="header__link">
						<select className="header__select" onChange={handleChange} value={currentLocale}>
							{languages.map(({ name, code }) => (
								<option className="header__option" key={code} value={code}>
									{name}
								</option>
							))}
						</select>
					</div>

					{user && user.isAdmin ? (
						<Link className="header__link" to="/admin">
							Admin
						</Link>
					) : null}

					<Link
						className="header__link"
						to="/"
						onClick={(evt) => {
							axios.post(`${API_URL}/logout`);
						}}
					>
						<FormattedMessage id="exit_link" />
					</Link>
				</div>
				<div className="header__nav-right">
					<a className="header__link" href="#">
						<img src={inst} alt="inst" />
					</a>
					<a className="header__link" href="#">
						<img src={tg} alt="inst" />
					</a>
					<a className="header__link" href="#">
						<img src={viber} alt="inst" />
					</a>
					<a
						className="header__link"
						href="#"
						onClick={() => {
							setPopupRegistrOpen(true);
						}}
					>
						<img src={profile} alt="inst" />
					</a>
				</div>
			</div>
			{isPopupRegistrOpen && (
				<Modal
					title={<FormattedMessage id="registr_title" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<img className="auth__image" src={authDefault} alt="" />

					<div className="auth__wrapper">
						<div className="auth__preinput">@</div>
						<InputIntl idName="registr_placeholder_1" />
					</div>
					<div className="auth__wrapper">
						<div className="auth__preinput">*</div>
						<InputIntl idName="registr_placeholder_2" />
					</div>

					<button className="auth__button">
						<FormattedMessage id="registr_btn" />
					</button>

					<p
						className="auth__next"
						onClick={() => {
							setPopupRegistrOpen(false);
							setPopupAuthOpen(true);
						}}
					>
						<FormattedMessage id="regist_post_title" />
					</p>
				</Modal>
			)}

			{isPopupAuthOpen && (
				<Modal
					title={<FormattedMessage id="auth_title" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<img className="auth__image" src={authDefault} alt="" />

					<div className="auth__wrapper">
						<div className="auth__preinput">@</div>
						<InputIntl idName="registr_placeholder_1" />
					</div>
					<div className="auth__wrapper">
						<div className="auth__preinput">*</div>
						<InputIntl idName="registr_placeholder_2" />
					</div>

					<button className="auth__button">
						<FormattedMessage id="auth_btn" />
					</button>

					<p
						className="auth__next"
						onClick={() => {
							setPopupRegistrOpen(true);
							setPopupAuthOpen(false);
						}}
					>
						<FormattedMessage id="auth_post_title" />
					</p>
				</Modal>
			)}
		</header>
	);
};

export default Header;

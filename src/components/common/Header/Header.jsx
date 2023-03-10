import React, { useEffect, useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

import { signUp } from '../../pages/Signup/utils';
import { signIn } from '../../pages/SignIn/utils';

const Header = ({ handleChange, currentLocale }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState();
	console.log('user: ', user);
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

	const handleFormSubmitRegistr = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signUp({ formData, setUser });
		setPopupRegistrOpen(false);
	});

	const handleFormSubmit = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signIn({ formData, setUser });
		setPopupAuthOpen(false);
	});

	return (
		<header className="header">
			<div className="header__container">
				<img className="header__logo" src={logo} alt="logo" />

				<div className="header__nav-left">
					<Link className="header__link" to="/">
						<FormattedMessage id="home_link" />
					</Link>
					<Link className="header__link" to="/clothes">
						<FormattedMessage id="clothes_link" />
					</Link>
					{/* <Link className="header__link" to="/main">
						<FormattedMessage id="accessories_link" />
					</Link>
					<Link className="header__link" to="/main">
						<FormattedMessage id="bijouterie_link" />
					</Link>
					<Link className="header__link" to="/main">
						<FormattedMessage id="shoes_link" />
					</Link> */}
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
							<FormattedMessage id="admin_link" />
						</Link>
					) : null}

					{user && user ? (
						<Link
							className="header__link"
							to="/"
							onClick={async (evt) => {
								const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
								if (response.status == 200) {
									window.location.reload();
								}
							}}
						>
							<FormattedMessage id="exit_link" />
						</Link>
					) : null}
				</div>
				<div className="header__nav-right">
					<a className="header__link" rel="noreferrer" target="_blank" href="https://www.instagram.com/thrn.bonheur">
						<img src={inst} alt="inst" />
					</a>
					<a className="header__link" rel="noreferrer" target="_blank" href="https://t.me/boonheeur">
						<img src={tg} alt="inst" />
					</a>
					<a
						className="header__link"
						rel="noreferrer"
						target="_blank"
						href="https://invite.viber.com/?g2=AQBaDJFGsoMsZ1Bbz7%2BextJ%2F3JDwt7iiSUBvrGHbsnOv1Y9SXM%2F%2FskksGrVFrOcJ"
					>
						<img src={viber} alt="inst" />
					</a>
					<div
						className="header__link"
						// href={user && Object.keys(user).length !== 0 ? '/profile' : '#'}
						onClick={() => {
							!user ? setPopupRegistrOpen(true) : navigate('/profile');
						}}
					>
						<img src={profile} alt="inst" />
					</div>
					{user ? (
						<Link className="header__link cart__link" to="/cart">
							&#128722;
						</Link>
					) : null}
				</div>
			</div>
			{/* registration modal */}
			{isPopupRegistrOpen && (
				<Modal
					title={<FormattedMessage id="registr_title" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<form className="auth__form" action={API_URL} method="POST" onSubmit={handleFormSubmitRegistr}>
						<img className="auth__image" src={authDefault} alt="" />

						<div className="auth__wrapper">
							<div className="auth__preinput">@</div>
							<InputIntl name="username" idName="registr_placeholder_1" />
						</div>
						<div className="auth__wrapper">
							<div className="auth__preinput">*</div>
							<InputIntl name="password" type="password" idName="registr_placeholder_2" />
						</div>

						<button className="auth__button" type="submit">
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
					</form>
				</Modal>
			)}

			{/* sign in modal */}

			{isPopupAuthOpen && (
				<Modal
					title={<FormattedMessage id="auth_title" />}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<form className="auth__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
						<img className="auth__image" src={authDefault} alt="" />

						<div className="auth__wrapper">
							<div className="auth__preinput">@</div>
							<InputIntl name="username" idName="registr_placeholder_1" />
						</div>
						<div className="auth__wrapper">
							<div className="auth__preinput">*</div>
							<InputIntl name="password" type="password" idName="registr_placeholder_2" />
						</div>

						<button className="auth__button" type="submit">
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
					</form>
				</Modal>
			)}
		</header>
	);
};

export default Header;

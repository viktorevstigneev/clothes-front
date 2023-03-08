import React, { useEffect, useState } from 'react';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider'


import { COLORS_FILTER, TYPE_FILTER } from './data';
import './style.css';
import { API_URL } from '../../../constants';
import { profileData } from './data';
import defaultImg from '../../../img/default.png';

const orders = [
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
];

const ProfilePage = () => {
	return (
		<>
			<main className="profile">
				<div className="profile__container">
					<h1 className="profile__title">Profile</h1>
					<div className="profile__wrapper">
						<img className="profile__avatar" src={defaultImg} alt="" />
						<div className="profile__block">
							<p className="profile__cred">Username: dkfdf</p>
							<p className="profile__cred">Email: gdjfdfsfs</p>
						</div>
					</div>
				</div>
				<div className="profile__bottom">
					<div className="bottom__head">
						<p className="bottom__title">Orders:</p>
						<p className="bottom__title"> Order status:</p>
					</div>
					{orders.map((order) => (
						<div className="bottom__order">
							<p className="bottom__order-name">{order.name}</p>
							<p className="bottom__order-name">{order.status}</p>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ProfilePage;

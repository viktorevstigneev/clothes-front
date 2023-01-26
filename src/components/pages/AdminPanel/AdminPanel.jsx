import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../../common/Header';

import './style.css';

import { API_URL } from '../../../constants';
import { COLORS_FILTER, TYPE_FILTER } from '../MainPage/data';

const AdminPanel = ({}) => {
	const [file, setFile] = useState('');
	const [currentType, setCurrentType] = useState('card');
	console.log('currentType: ', currentType);

	return (
		<section className="admin">
			<Header />
			<h1 className="admin__title">add new Menu</h1>
			<form
				className="admin__person"
				encType="multipart/form-data"
				// method="POST"
				onSubmit={async (evt) => {
					evt.preventDefault();

					const formData = new FormData(evt.target);

					const responseData = await axios({
						method: 'POST',
						url: `${API_URL}/team`,
						data: formData,
						withCredentials: true,
					});
					window.location.reload();
				}}
			>
				<div className="admin__block">
					<label className="admin__label" htmlFor="avatar">
						<img
							className="admin__avatar"
							src={file ? URL.createObjectURL(file) : `${API_URL}/getImage/default.jpeg`}
							alt="menu_picture"
						/>
						<div className="admin__icon">+</div>
					</label>
					<input
						className="admin__input"
						id="avatar"
						name="avatar"
						type="file"
						onChange={(evt) => setFile(evt.target.files[0])}
					/>
				</div>

				<div className="admin__right">
					<label className="music__label" htmlFor="type">
						Choose Menu color
					</label>
					<select className="admin__text-input" name="color" id="type">
						{COLORS_FILTER.map((color) => (
							<option className="option__item" data-value={color} key={color.name} style={{ background: color.hex }}>
								{color.name}
							</option>
						))}
					</select>

					<label className="music__label" htmlFor="type">
						<p className="">Choose Menu type</p>
						<div className="type__content">
							{TYPE_FILTER.map((item, index) => (
								<div
									className="type__img-wrap"
									key={index}
									onClick={() => {
										setCurrentType(item.type);
									}}
									style={{ border: currentType === item.type ? '1px solid white' : '' }}
								>
									<img className="type__img-select" src={item.img} alt="type" />
									<p className="">{item.type}</p>
								</div>
							))}
						</div>
					</label>
					<select
						className="admin__text-input"
						name="typeThing"
						id="type"
						value={currentType}
						onChange={(evt) => {
							setCurrentType(evt.target.value);
						}}
					>
						<option className="option__item-type" value="card">
							card
						</option>
						<option className="option__item-type" value="book">
							book
						</option>
						<option className="option__item-type" value="fold">
							fold
						</option>
					</select>

					<label className="music__label" htmlFor="type">
						Choose Menu definition
					</label>
					<select className="admin__text-input" name="isBar" id="type">
						<option className="option__item-type" value="true">
							bar
						</option>
						<option className="option__item-type" value="false">
							restaurant
						</option>
					</select>
					<button className="admin__button" type="submit">
						Add menu
					</button>
				</div>
			</form>
		</section>
	);
};

AdminPanel.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

AdminPanel.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default AdminPanel;

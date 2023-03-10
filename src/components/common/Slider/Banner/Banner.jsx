import axios from 'axios';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { API_URL } from '../../../../constants';
import './style.css';

const Banner = ({ image, isDashed, id }) => {
	console.log('id: ', id);
	const [file, setFile] = useState('');
	return (
		<div className="editor__block" style={{ border: isDashed ? '3px dashed rgb(61, 61, 61)' : 'none' }}>
			{!isDashed && (
				<div
					className="banner__delete"
					onClick={async () => {
						await axios.post(`${API_URL}/deleteBanner`,{id});
						window.location.reload();
					}}
				>
					&times;
				</div>
			)}
			{!isDashed || file ? (
				<img className="editor__avatar" src={file ? URL.createObjectURL(file) : image} alt="img" />
			) : null}
			{isDashed ? (
				<form
					className="admin__person"
					encType="multipart/form-data"
					// method="POST"
					onSubmit={async (evt) => {
						evt.preventDefault();

						const formData = new FormData(evt.target);

						const responseData = await axios({
							method: 'POST',
							url: `${API_URL}/banner`,
							data: formData,
							withCredentials: true,
						});
						window.location.reload();
					}}
				>
					<p className="editor__drop">Drop file there or</p>
					<input
						className="editor__input"
						id="avatar"
						name="avatar"
						type="file"
						onChange={(evt) => setFile(evt.target.files[0])}
					/>
					{file && (
						<button className="add__banner" type="submit">
							<FormattedMessage id="add__banner__btn" />
						</button>
					)}
				</form>
			) : null}
		</div>
	);
};

export default Banner;

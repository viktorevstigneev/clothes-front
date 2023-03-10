import React, { useState } from 'react';
import { API_URL } from '../../../../constants';
import './style.css';

const Banner = ({ image, isDashed }) => {
	const [file, setFile] = useState('');
	return (
		<div className="editor__block" style={{ border: isDashed ? '3px dashed rgb(61, 61, 61)' : 'none' }}>
			{/* <label className="editor__label" htmlFor="avatar"> */}
			{!isDashed || file ? <img className="editor__avatar" src={file ? URL.createObjectURL(file) : image} /> : null}
			{/* </label> */}
			{isDashed && !file ? (
				<>
					<p className="editor__drop">Drop file there or</p>
					<input
						className="editor__input"
						id="avatar"
						name="avatar"
						type="file"
						onChange={(evt) => setFile(evt.target.files[0])}
					/>
				</> 
			) : null}
		</div>
	);
};

export default Banner;

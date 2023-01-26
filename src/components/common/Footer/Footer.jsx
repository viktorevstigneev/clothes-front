import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import './style.css';

const Header = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__wrapper-left">
					<h3 className="footer__title">
						<FormattedMessage id="footer_title" />
					</h3>
					<p className="footer__decription">
						<FormattedMessage id="footer_desc" />
					</p>
				</div>
				<div className="footer__wrapper-middle">
					<h3 className="footer__title">
						<FormattedMessage id="footer_middle_title" />
					</h3>
					<Link className="footer__link" to="/">
						<FormattedMessage id="footer_middle_link_1" />
					</Link>
					<Link className="footer__link" to="/">
						<FormattedMessage id="footer_middle_link_2" />
					</Link>
					<Link className="footer__link" to="/">
						<FormattedMessage id="footer_middle_link_3" />
					</Link>
				</div>

				<div className="footer__wrapper-right">
					<h3 className="footer__title">
						<FormattedMessage id="footer_right_title" />
					</h3>
					<a
						className="footer__link"
						href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0+4,+%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE/@53.7041056,23.8123444,17z/data=!3m1!4b1!4m5!3m4!1s0x46e078ba1621be5f:0xc26a937527f8e3f3!8m2!3d53.7041024!4d23.8145331?hl=ru"
					>
						<FormattedMessage id="footer_right_link_1" />
					</a>
					<a className="footer__link" href=''>
						<FormattedMessage id="footer_right_link_2" />
					</a>
					<a className="footer__link" href=''>
						<FormattedMessage id="footer_right_link_3" />
					</a>
					<a className="footer__link" href=''>
						<FormattedMessage id="footer_right_link_4" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Header;

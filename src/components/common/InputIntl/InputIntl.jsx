import React from 'react';
import { injectIntl } from 'react-intl';

const InputIntl = ({ intl, idName }) => {
	const placeholder = intl.formatMessage({ id: idName });
	return <input className="auth__input" placeholder={placeholder} />;
};


export default injectIntl(InputIntl);

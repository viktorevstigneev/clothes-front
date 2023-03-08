import './App.css';
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './components/i18n/locales';
import { messages } from './components/i18n/messages';
import Header from './components/common/Header';

// const SignInPage = lazy(() => import('./components/pages/SignIn'));
// const SignUpPage = lazy(() => import('./components/pages/Signup'));
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ClothesPage = lazy(() => import('./components/pages/ClothesPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage'));
const AdminPage = lazy(() => import('./components/pages/AdminPanel'));
// const ContactPage = lazy(() => import('./components/pages/ContactPage'));

function App() {
	const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

	const handleChange = (e) => {
		setCurrentLocale(e.target.value);
		localStorage.setItem('locale', e.target.value);
	};
	function getInitialLocal() {
		const savedLocale = localStorage.getItem('locale');
		return savedLocale || LOCALES.ENGLISH;
	}
	return (
		<BrowserRouter>
			<IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
				<Header handleChange={handleChange} currentLocale={currentLocale} />
				<Suspense fallback={'load'}>
					<Routes>
						{/* <Route path="/" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} /> */}
						<Route path="/" element={<MainPage />} />
						<Route path="/clothes" element={<ClothesPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/admin" element={<AdminPage />} />
						{/*
					<Route path="/contact" element={<ContactPage />} /> */}
					</Routes>
					{/* <Navigate  to="/main" /> */}
				</Suspense>
			</IntlProvider>
		</BrowserRouter>
	);
}

export default App;

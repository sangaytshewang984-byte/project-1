import React from 'react';
import BookingForm from './BookingForm';

const Layout = ({ children }) => {
	return (
		<div className="main-layout">
			<header>
				<h1>Fabla Inventory</h1>
			</header>
			<nav>
				{/* Add navigation links here if needed */}
			</nav>
			<main>
				<BookingForm />
				{children}
			</main>
			<footer>
				<p>&copy; 2025 Fabla Inventory</p>
			</footer>
		</div>
	);
};

export default Layout;

import { Link } from 'react-router-dom';
import './HomeExperience.css';

export default function Footers() {
	return (
		<footer className="store-footer">
			<div className="store-footer-main">
				<Link className="store-footer-brand" to="/" aria-label="BuyNow home">BuyNow<span>.</span></Link>
				<p>Good things for the everyday.</p>
				<nav className="store-footer-links" aria-label="Footer navigation">
					<Link to="/">Shop</Link>
					<Link to="/orders">Your orders</Link>
					<a href="mailto:hello@buynow.example">Contact</a>
				</nav>
			</div>
			<div className="store-footer-bottom">
				<span>© {new Date().getFullYear()} BuyNow</span>
				<span>Thoughtful finds, right on time.</span>
			</div>
		</footer>
	);
}

import { Link } from 'react-router-dom';
import './HomeExperience.css';

export default function Herosection({
	products = [],
	totalProducts = products.length,
	cartItems = [],
	selectedQuantities = {},
	onQuantityChange,
	onAddToCart,
	searchTerm = '',
}) {
	return (
		<>
			<section className="store-hero" aria-labelledby="store-hero-title">
				<div className="store-hero-copy">
					<p className="store-hero-kicker">GOOD FINDS, EVERY DAY</p>
					<h1 id="store-hero-title">A little better shopping starts here.</h1>
					<p className="store-hero-description">
						Useful things for your home, your wardrobe, and everything in between.
					</p>
					<div className="store-hero-actions">
						<a className="store-hero-shop" href="#products">Explore the collection <span aria-hidden="true">↘</span></a>
						<Link className="store-hero-auth store-hero-auth-primary" to="/account/register">
							Create account
						</Link>
						<Link className="store-hero-auth" to="/account/sign-in">
							Sign in
						</Link>
					</div>
				</div>
				<div className="store-hero-note" aria-hidden="true">
					<span className="store-hero-note-mark">bn</span>
					<span>Find your everyday<br />favorites.</span>
				</div>
			</section>

			<section className="feature-products" id="products" aria-labelledby="products-title">
				<div className="feature-products-heading">
					<div>
						<p className="store-hero-kicker">THE BUYNOW EDIT</p>
						<h2 id="products-title">{searchTerm ? 'Search results' : 'Picked for your everyday'}</h2>
					</div>
					{searchTerm && <p className="search-results-heading">{totalProducts} result{totalProducts === 1 ? '' : 's'} for “{searchTerm}”</p>}
				</div>

				<div className="products-grid">
					{products.map((product) => {
						const isAdded = cartItems.some((item) => item.productId === product.id);
						return (
							<article key={product.id} className="product-container">
								<div className="product-image-container">
									<img className="product-image" src={product.image} alt={product.name} />
								</div>
								<div className="product-name limit-text-to-2-lines">{product.name}</div>
								<div className="product-rating-container">
									<img
										className="product-rating-stars"
										src={`images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`}
										alt={`${product.rating.stars} stars`}
									/>
									<span className="product-rating-count">{product.rating.count}</span>
								</div>
								<div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>
								<div className="product-quantity-container">
									<label className="quantity-label" htmlFor={`quantity-${product.id}`}>Qty</label>
									<select
										id={`quantity-${product.id}`}
										value={selectedQuantities[product.id] || 1}
										onChange={(event) => onQuantityChange(product.id, Number(event.target.value))}
									>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
											<option key={quantity} value={quantity}>{quantity}</option>
										))}
									</select>
								</div>
								<div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }} aria-live="polite">
									<img src="images/icons/checkmark.png" alt="" /> Added
								</div>
								<button
									className="add-to-cart-button button-primary"
									type="button"
									onClick={() => onAddToCart(product.id)}
								>
									{isAdded ? 'Add another' : 'Add to cart'}
								</button>
							</article>
						);
					})}
				</div>
				{products.length === 0 && <p className="no-search-results">No products matched your search.</p>}
			</section>

		</>
	);
}

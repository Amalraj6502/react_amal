import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage({ onProductClick }) {
  const { wishlist, dispatch } = useCart();

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Wishlist ❤️</h1>
        <p className="page-sub">{wishlist.length} saved items</p>
      </div>
      {wishlist.length === 0 ? (
        <div className="empty-page">
          <div className="empty-icon">💔</div>
          <h3>Your wishlist is empty</h3>
          <p>Save products you love for later</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
          ))}
        </div>
      )}
    </main>
  );
}

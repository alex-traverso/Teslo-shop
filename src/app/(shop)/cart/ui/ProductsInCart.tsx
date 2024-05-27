"use client";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/ui/cart/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity
	);

	const removeProduct = useCartStore((state) => state.removeProduct);

	const [loaded, setLoaded] = useState(false);

	const productsInCart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			{productsInCart.map((product) => (
				<div key={`${product.slug}-${product.size}`} className="flex mb-3">
					<ProductImage
						src={product.image}
						width={100}
						height={100}
						alt={product.title}
						className="mr-5 rounded object-cover"
					/>
					<div>
						<Link
							href={`/product/${product.slug}`}
							className="hover:underline cursor-pointer"
						>
							{product.size} - {product.title}
						</Link>
						<p>{product.title}</p>
						<p>${product.price}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChanged={(quantity) =>
								updateProductQuantity(product, quantity)
							}
						/>
						<button
							onClick={() => removeProduct(product)}
							className="underline mt-3 hover:text-red-600 transition-all"
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

"use client";
import { useCartStore } from "@/store/ui/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
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
					<Image
						src={`/products/${product.image}`}
						width={100}
						height={100}
						alt={product.title}
						className="mr-5 rounded object-cover"
					/>
					<div>
						<span>
							{product.size} - {product.title} ({product.quantity})
						</span>

						<p className="font-bold">
							{currencyFormat(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

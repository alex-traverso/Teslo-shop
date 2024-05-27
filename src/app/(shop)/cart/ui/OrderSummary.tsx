"use client";

import { useCartStore } from "@/store/ui/cart/cart-store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
	const router = useRouter();
	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation()
	);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	useEffect(() => {
		if (itemsInCart === 0 && loaded === true) {
			router.replace("/empty");
		}
	}, [itemsInCart, loaded, router]);

	if (!loaded) {
		return <p>Loading...</p>;
	}

	return (
		<div className="grid grid-cols-2">
			<span>Número de articulos</span>
			<span className="text-right">
				{itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}{" "}
				articulos
			</span>

			<span>Subtotal</span>
			<span className="text-right">{currencyFormat(subTotal)}</span>

			<span>Impuestos (15%)</span>
			<span className="text-right">{currencyFormat(tax)}</span>

			<span className="text-2xl mt-5">Total</span>
			<span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
		</div>
	);
};

"use client";
import { useEffect } from "react";
import { Title } from "@/components/ui/title/Title";

import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { useCartStore } from "@/store/ui/cart/cart-store";
// import { redirect } from "next/navigation";

export default function CheckoutPage() {
	const cartStore = useCartStore((state) => state.cart);

	//Todo: Validar si el carrito está vacío, que haga un redirect hacia el home.
	// useEffect(() => {
	// 	if (cartStore.length === 0) {
	// 		redirect("/");
	// 	}
	// }, [cartStore]);

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px] ">
				<Title title="Verificar orden" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Confirmar elementos</span>
						<Link href="/cart" className="underline mb-5">
							Editar carrito
						</Link>

						{/* Items */}
						<ProductsInCart />
					</div>

					{/* Checkout */}
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}

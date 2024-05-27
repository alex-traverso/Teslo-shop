"use client";
import { useEffect, useState } from "react";
import { titleFont } from "@/app/config/fonts";
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUIStore } from "@/store/ui/ui-store";
import { useCartStore } from "@/store/ui/cart/cart-store";

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu);
	const totalItemsInCart = useCartStore((state) => state.getTotalItems());

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<nav className="flex px-5 h-16 justify-between items-center w-full shadow-md">
			<div>
				<Link href="/">
					<span className={`${titleFont.className} antialiased font-bold`}>
						Teslo
					</span>
					<span> | Shop</span>
				</Link>
			</div>
			<div className="hidden sm:block">
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/men"
				>
					Hombres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/women"
				>
					Mujeres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/kid"
				>
					Niños
				</Link>
			</div>

			{/* Search, cart, menu */}
			<div className="flex items-center">
				<Link href="/search" className="mx-2">
					<IoSearchOutline className="w-5 h-5" />
				</Link>
				<Link
					href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
					className="mx-2"
				>
					<div className="relative">
						{loaded && totalItemsInCart > 0 && (
							<span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-500 text-white">
								{totalItemsInCart}
							</span>
						)}
						<IoCartOutline className="w-5 h-5" />
					</div>
				</Link>

				<button
					onClick={() => openSideMenu()}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
				>
					Menú
				</button>
			</div>
		</nav>
	);
};

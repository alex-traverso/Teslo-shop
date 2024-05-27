"use client";

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/app/config/fonts";

interface Props {
	slug: string;
	inStock: number;
}

export const StockLabel = ({ slug, inStock }: Props) => {
	const [stock, setStock] = useState(0);
	const [isLoading, setIsLloading] = useState(true);

	useEffect(() => {
		const getStock = async () => {
			const inStock = await getStockBySlug(slug);
			setStock(inStock);
			setIsLloading(false);
		};

		getStock();
	}, [slug]);

	return (
		<>
			{isLoading ? (
				<h1
					className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}
				>
					&nbsp;
				</h1>
			) : (
				<h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
					Stock: {stock}
				</h1>
			)}
		</>
	);
};

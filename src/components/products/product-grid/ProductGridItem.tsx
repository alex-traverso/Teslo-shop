"use client";

import { useState } from "react";
import { Product } from "@/interfaces/product.interface";
import Link from "next/link";
import { ProductImage } from "@/components/product/product-image/ProductImage";

interface Props {
	product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
	const [displayImage, setDisplayImage] = useState(product.images[0]);

	//Todo: Actualizar Image por ProductImage component.
	return (
		<div className="rounded-md overflow-hidden fade-in">
			<Link href={`/product/${product.slug}`}>
				<ProductImage
					src={`${displayImage}`}
					alt={product.title}
					className="w-full object-cover rounded-lg"
					width={800}
					height={800}
					onMouseEnter={() => {
						setDisplayImage(product.images[1]);
					}}
					onMouseLeave={() => {
						setDisplayImage(product.images[0]);
					}}
				/>
			</Link>
			<div className="p-4 flex flex-col ">
				<Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
					{product.title}
				</Link>
				<span className="font-bold">${product.price}</span>
			</div>
		</div>
	);
};

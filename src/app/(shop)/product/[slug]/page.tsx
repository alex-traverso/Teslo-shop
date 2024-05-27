export const revalidate = 604800;

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { titleFont } from "@/app/config/fonts";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";
import { Title } from "@/components/ui/title/Title";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const product = await getProductBySlug(slug);

	return {
		title: product?.title ?? "Producto no encontrado",
		description: product?.description ?? "",
		openGraph: {
			title: product?.title ?? "Producto no encontrado",
			description: product?.description ?? "",
			images: [`/products/${product?.images[1]}`],
		},
	};
}

export default async function ProductBySlugPage({ params }: Props) {
	const { slug } = params;

	const product = await getProductBySlug(slug);
	if (!product) {
		notFound();
	}

	return (
		<div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
			{/* Desktop Slideshow */}
			<div className="col-span-1 md:col-span-2 ">
				<ProductSlideshow
					title={product.title}
					images={product.images}
					className="hidden md:block"
				/>

				{/* Mobile Slideshow */}
				<ProductMobileSlideshow
					title={product.title}
					images={product.images}
					className="block md:hidden"
				/>
			</div>

			{/* Detalles */}
			<div className="col-span-1 px-5">
				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					{product.title}
				</h1>
				<StockLabel slug={product.slug} inStock={product.inStock} />
				<p className="text-xl font-bold tracking-wide mb-5 text-green-600">
					${product.price}
				</p>
				<AddToCart product={product} />
				<h3 className="font-bold text-sm">Descripción</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	);
}

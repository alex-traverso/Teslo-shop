import { titleFont } from "@/app/config/fonts";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
	params: {
		slug: string;
	};
}

export default function ProductPage({ params }: Props) {
	const { slug } = params;

	const product = initialData.products.find((product) => product.slug === slug);

	if (!product) {
		notFound();
	}

	return (
		<div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
			{/* Desktop Slideshow */}
			<div className="col-span-1 md:col-span-2">
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
				<p className="text-lg mb-5">${product.price}</p>
				{/* Selector de tallas */}
				<SizeSelector
					selectedSize={product.sizes[0]}
					availableSizes={product.sizes}
				/>
				{/* Selector de cantidad */}
				<QuantitySelector quantity={2} />

				{/* Button */}
				<button className="btn-primary my-5">Agregar al carrito</button>
				<h3 className="font-bold text-sm">Descripción</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	);
}

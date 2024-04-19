import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { redirect } from "next/navigation";

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function CartPage() {
	// console.log(productsInCart.length);
	if (productsInCart.length <= 0) {
		redirect("/empty");
	}

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px] ">
				<Title title="Carrito" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Agregar más items</span>
						<Link href="/" className="underline mb-5">
							Continúa comprando
						</Link>

						{/* Items */}
						{productsInCart.map((product) => (
							<div key={product.slug} className="flex">
								<Image
									src={`/products/${product.images[0]}`}
									width={100}
									height={100}
									alt={product.title}
									className="mr-5 rounded object-cover"
								/>
								<div>
									<p>{product.title}</p>
									<p>${product.price}</p>
									<QuantitySelector quantity={1} />
									<button className="underline mt-3">Remover</button>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className="bg-white rounded-xl shadow-lg p-7 h-fit">
						<h2 className="text-xl mb-2">Resumen de orden</h2>
						<div className="grid grid-cols-2">
							<span>Número de articulos</span>
							<span className="text-right">3 articulos</span>

							<span>Subtotal</span>
							<span className="text-right">$100</span>

							<span>Impuestos (15%)</span>
							<span className="text-right">$15</span>

							<span className="text-2xl mt-5">Total</span>
							<span className="text-right text-2xl mt-5">$115</span>
						</div>

						<div className="/">
							<Link
								className="mt-5 mb-2 w-full flex btn-primary justify-center"
								href="/checkout/address"
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

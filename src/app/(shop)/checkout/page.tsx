import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function CheckoutPage() {
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
									<p>${product.price} x 3</p>
									<p className="font-bold">Subtotal: ${product.price * 3}</p>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className="bg-white rounded-xl shadow-lg p-7">
						<h2 className="text-2xl mb-2">Dirección de entrega</h2>
						<div className="mb-10 ">
							<p>Nombre y apellido</p>
							<p>Direccion</p>
							<p>Ciudad</p>
							<p>Barrio</p>
							<p>Codigo postal</p>
							<p>Telefono</p>
						</div>

						{/* Divider */}

						<div className="w-full h-0.5 bg-gray-200 mb-10"></div>

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

						<p className="mb-5">
							{/* Disclaimer */}
							<span className="text-sm">
								Al hacer clic en Confirmar orden, aceptas nuestros{" "}
								<a href="#" className="underline">
									términos y condiciones{" "}
								</a>
								y{" "}
								<a href="#" className="underline">
									política de privacidad
								</a>
							</span>
						</p>

						<Link
							className="mt-5 mb-2 w-full flex btn-primary justify-center"
							href="/orders/123"
						>
							Confirmar orden
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

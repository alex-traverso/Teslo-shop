import { Title } from "@/components/ui/title/Title";
import Image from "next/image";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import { OrderStatus } from "@/components/orders/OrderStatus";

interface Props {
	params: {
		id: string;
	};
}

export default async function OrdersPage({ params }: Props) {
	const { id } = params;

	//Todo: Llamar el server action
	const { ok, order } = await getOrderById(id);

	if (!ok) {
		redirect("/");
	}

	const address = order?.OrderAddress;

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px] ">
				<Title title={`Orden #${id.split("-").at(-1)}`} />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<OrderStatus isPaid={order?.isPaid ?? false} />

						{/* Items */}
						{order!.OrderItem.map((item) => (
							<div key={item.product.slug + "-" + item.size} className="flex">
								<Image
									src={`/products/${item.product.ProductImage[0].url}`}
									width={100}
									height={100}
									alt={item.product.title}
									className="mr-5 rounded object-cover"
								/>
								<div>
									<p>{item.product.title}</p>
									<p>
										${item.price} x {item.quantity}
									</p>
									<p className="font-bold">
										Subtotal: {currencyFormat(item.price * item.quantity)}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className="bg-white rounded-xl shadow-lg p-7">
						<h2 className="text-2xl mb-2">Dirección de entrega</h2>
						<div className="mb-10 ">
							<p className="text-xl">
								{address!.firstName} {address!.lastName}
							</p>
							<p>{address!.address}</p>
							<p>{address!.address2}</p>
							<p>{address!.postalCode}</p>
							<p>
								{address!.city}, {address!.countryId}
							</p>
							<p>{address!.phone}</p>
						</div>

						{/* Divider */}
						<div className="w-full h-0.5 bg-gray-200 mb-10"></div>
						{/* Divider */}

						<h2 className="text-xl mb-2">Resumen de orden</h2>
						<div className="grid grid-cols-2">
							<span>Número de articulos</span>
							<span className="text-right">
								{order!.itemsInOrder === 1
									? "1 artículo"
									: `${order!.itemsInOrder} artículos`}
							</span>

							<span>Subtotal</span>
							<span className="text-right">
								{currencyFormat(order!.subTotal)}
							</span>

							<span>Impuestos (15%)</span>
							<span className="text-right">{currencyFormat(order!.tax)}</span>

							<span className="text-2xl mt-5">Total</span>
							<span className="text-right text-2xl mt-5">
								{currencyFormat(order!.total)}
							</span>
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
						<div className="mt-5 mb-2 w-full">
							{order?.isPaid ? (
								<OrderStatus isPaid={order?.isPaid ?? false} />
							) : (
								<PayPalButton orderId={order!.id} amount={order!.total} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
	CreateOrderData,
	CreateOrderActions,
	OnApproveActions,
	OnApproveData,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";

interface Props {
	orderId: string;
	amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer();

	const roundedAmount = Math.round(amount * 100) / 100;

	if (isPending) {
		return (
			<div className="animate-pulse">
				<div className="h-11 bg-gray-300 rouned" />
				<div className="h-11 bg-gray-300 rouned mt-4" />
			</div>
		);
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions
	): Promise<string> => {
		const transactionId = await actions.order.create({
			intent: "CAPTURE",
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: `${roundedAmount}`,
						currency_code: "USD",
					},
				},
			],
		});

		const { ok } = await setTransactionId(orderId, transactionId);

		if (!ok) {
			throw new Error("No se pudo actualizar la orden.");
		}

		//Todo: Guardar el ID en la DB

		return transactionId;
	};

	const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
		const details = await actions.order?.capture();
		if (!details) return;

		await paypalCheckPayment(details.id);
	};

	return (
		<div className="relative z-0">
			<PayPalButtons createOrder={createOrder} onApprove={onApprove} />
		</div>
	);
};

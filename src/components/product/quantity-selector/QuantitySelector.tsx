"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
	quantity: number;
	onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
	const onValueChanged = (value: number) => {
		if (quantity + value < 1) return;
		onQuantityChanged(quantity + value);
	};

	return (
		<div className="flex">
			<button onClick={() => onValueChanged(-1)}>
				<IoRemoveCircleOutline />
			</button>
			<span className="w-20 mx-3 px-5 bg-[#f0f0f0] text-center rounded">
				{quantity}
			</span>
			<button onClick={() => onValueChanged(+1)}>
				<IoAddCircleOutline />
			</button>
		</div>
	);
};

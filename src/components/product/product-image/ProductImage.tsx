import Image from "next/image";

interface Props {
	src?: string;
	alt: string;
	className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
	style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
	width: number;
	height: number;
	onMouseEnter?: (image: any) => void;
	onMouseLeave?: (image: any) => void;
}

export const ProductImage = ({
	src,
	alt,
	className,
	width,
	height,
	style,
	onMouseEnter,
	onMouseLeave,
}: Props) => {
	const localSrc = src
		? src.startsWith("http") // ej: https://urlejemplo.jpg
			? src // mostramos el src tal cual viene
			: `/products/${src}` // verifica si el src proviene de el url /products
		: "/imgs/placeholder.jpg"; // si ninguna de las validaciones anteriores se cumple, mostramos la imagen de placeholder de /public

	return (
		<Image
			src={localSrc}
			width={width}
			height={height}
			alt={alt}
			className={className}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		/>
	);
};

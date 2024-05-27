import { titleFont } from "@/app/config/fonts";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="flex w-full justify-center items-center text-xs h-16">
			<Link href="/">
				<span className={`${titleFont.className} antialiased font-bold`}>
					Teslo{" "}
				</span>
				<span>| shop</span>
				<span>© {new Date().getFullYear()}</span>
			</Link>
			<Link href="/" className="mx-3">
				Privacidad & Legal{" "}
			</Link>
			<Link href="/" className="mx-3">
				{" "}
				Ubicaciones
			</Link>
		</div>
	);
};

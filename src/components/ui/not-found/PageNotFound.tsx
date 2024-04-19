import { titleFont } from "@/app/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
	return (
		<div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
			<div className="text-center px-5 mx-5">
				<h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
				<p className="font-bold text-xl">Oops! Lo sentimos mucho.</p>
				<span className="font-light">Puedes regresar al inicio</span>
				<div className="bg-blue-400 w-auto rounded-md mt-2 p-2 hover:bg-blue-500 transition-all cursor-pointer">
					<Link
						href="/"
						className="font-normal hover:underline transition-all text-white"
					>
						Ir al Inicio
					</Link>
				</div>
			</div>
			<div className="px-5 mx-5">
				<Image
					src="/imgs/404-not-found.png"
					alt="Starman"
					className="p-5 sm:p-0"
					width={550}
					height={550}
				/>
			</div>
		</div>
	);
};

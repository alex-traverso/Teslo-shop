"use client";

import { logout } from "@/actions/auth/logout";
import { useUIStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	const router = useRouter();

	const { data: session } = useSession();

	const isAuthenticated = !!session?.user;

	const isAdmin = session?.user.role === "admin";

	const handleLogout = async () => {
		await logout();
		closeMenu();
		if (window.location.pathname !== "/") {
			window.location.href = "/";
		} else {
			window.location.reload();
		}
	};

	return (
		<div>
			{/* Background black */}
			{isSideMenuOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
			)}

			{/* Background blur */}
			{isSideMenuOpen && (
				<div
					onClick={() => closeMenu()}
					className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm "
				></div>
			)}

			{/* Sidemenu */}
			<nav
				className={clsx(
					"fixed p-5 right-0 top-0 w-full md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
					{
						"translate-x-full": !isSideMenuOpen,
					}
				)}
			>
				<IoCloseOutline
					size={40}
					className="absolute top-5 right-5 cursor-pointer"
					onClick={() => closeMenu()}
				/>

				{/* Input de busqueda */}
				<div className="relative mt-14">
					<IoSearchOutline size={20} className="absolute top-2 left-2" />
					<input
						type="text"
						placeholder="Buscar"
						className="w-full bg-[#fcfcfc] rounded pl-10 py-1 pr-10 text-lg font-light border-gray-300 shadow-md focus:outline-none focus:border-blue-400"
					/>
				</div>

				{/* Menu */}
				{isAuthenticated && (
					<>
						<Link
							href="/profile"
							onClick={() => closeMenu()}
							className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoPersonOutline size={25} />
							<span className="ml-3 text-base">Perfil</span>
						</Link>
						<Link
							href="/orders"
							onClick={() => closeMenu()}
							className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoTicketOutline size={25} />
							<span className="ml-3 text-base">Ordenes</span>
						</Link>
					</>
				)}

				{isAuthenticated && (
					<button
						onClick={handleLogout}
						className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
					>
						<IoLogOutOutline size={25} />
						<span className="ml-3 text-base">Cerrar Sesión</span>
					</button>
				)}

				{!isAuthenticated && (
					<Link
						onClick={() => closeMenu()}
						href="/auth/login"
						className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
					>
						<IoLogInOutline size={25} />
						<span className="ml-3 text-base">Ingresar</span>
					</Link>
				)}

				{/* Line separator, Admin menu */}
				{isAdmin && (
					<>
						<div className="w-full h-px bg-gray-200 my-10"></div>

						<Link
							href="/admin/products"
							onClick={() => closeMenu()}
							className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoShirtOutline size={25} />
							<span className="ml-3 text-base">Productos</span>
						</Link>
						<Link
							href="/admin/orders"
							onClick={() => closeMenu()}
							className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoTicketOutline size={25} />
							<span className="ml-3 text-base">Ordenes</span>
						</Link>
						<Link
							href="/admin/users"
							onClick={() => closeMenu()}
							className="flex items-center mt-8 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoPeopleOutline size={25} />

							<span className="ml-3 text-base">Usuarios</span>
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};

"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
	page?: number;
	take?: number;
}

export const getPaginatedUsers = async ({
	page = 1,
	take = 10,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;
	const session = await auth();

	if (session?.user.role !== "admin") {
		return {
			ok: false,
			message: "Debe ser un usuario administrador",
		};
	}

	const users = await prisma.user.findMany({
		take: take,
		skip: (page - 1) * take,
		orderBy: {
			name: "desc",
		},
	});

	//Total de orders
	const totalCount = await prisma.user.count();

	const totalPages = Math.ceil(totalCount / take);

	return {
		ok: true,
		users: users,
		totalPages: totalPages,
		currentPage: page,
	};
};

"use server";

import prisma from "@/lib/prisma";

export const getUserImage = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			image: true,
		},
	});
	return user;
};

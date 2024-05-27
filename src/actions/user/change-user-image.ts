"use server";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

import prisma from "@/lib/prisma";

export const changeUserImage = async (formData: FormData, userId: string) => {
	try {
		const file = formData.get("image") as File;
		const image = await uploadImages(file);

		if (!file) {
			throw new Error("No file uploaded");
		}
		console.log(image);

		const userImage = await prisma.user.update({
			where: {
				id: userId,
			},
			select: {
				image: true,
			},
			data: { image: image },
		});

		return { ok: true, imageUrl: userImage.image };
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo actualizar la imagen.",
		};
	}
};

const uploadImages = async (image: File) => {
	try {
		const buffer = await image.arrayBuffer();
		const base64Image = Buffer.from(buffer).toString("base64");

		//TODO: Retornar correctamente la imagen a la base de datos, capaz es con cloudinary

		const uploadedImage = await cloudinary.uploader
			.upload(`data:image/png;base64,${base64Image}`)
			.then((res) => res.secure_url);

		return uploadedImage;
	} catch (error) {
		console.log(error);
		return null;
	}
};

"use client";
import { changeUserImage } from "@/actions/user/change-user-image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoPencilOutline } from "react-icons/io5";

interface UserImageProps {
	className: string;
	src: string;
	width: number;
	height: number;
	alt: string;
	userId: string;
}

export const UserImage = ({
	className,
	userId,
	src,
	width,
	height,
	alt,
}: UserImageProps) => {
	const { handleSubmit, register } = useForm();

	const [file, setFile] = useState<File | null>(null);
	const [userImage, setUserImage] = useState<string>(src);
	const router = useRouter();

	const onSubmit = async () => {
		const formData = new FormData();

		if (file) {
			formData.append("image", file);
			const response = await changeUserImage(formData, userId);

			if (response.ok) {
				setUserImage(response.imageUrl ?? "");
				router.refresh();
			}

			console.log(userImage);
		} else {
			console.log("No file selected");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="relative">
				<Image
					className={className}
					src={userImage}
					width={width}
					height={height}
					alt={alt}
				/>
				<div className="absolute right-2 bottom-1 h-8 w-8 rounded-full bg-gray-300 flex justify-center items-center shadow-sm hover:bg-blue-500 transition-all cursor-pointer first:text-white group">
					<IoPencilOutline
						size={22}
						className="text-gray-700 transition-all group-hover:text-white"
					/>
					<input
						className="absolute inset-0 opacity-0 cursor-pointer"
						{...register("image")}
						type="file"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								const selectedFile = e.target.files[0];
								setFile(selectedFile);
								setUserImage(URL.createObjectURL(selectedFile));
							}
						}}
					/>
				</div>
			</div>
			{file && (
				<button type="submit" className="btn-primary mt-2">
					Guardar
				</button>
			)}
		</form>
	);
};

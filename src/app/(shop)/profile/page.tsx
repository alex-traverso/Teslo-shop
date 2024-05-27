import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { UserImage } from "./ui/UserImage";
import { getUserImage } from "@/actions/user/get-user-image";

export default async function ProfilePage() {
	const session = await auth();

	const fullName = session?.user.name ?? "";
	const [firstName, lastName] = fullName.split(" ") ?? "";

	if (!session?.user) {
		redirect("/");
	}

	const userImage = await getUserImage(session.user.id);

	return (
		<div className="flex flex-col justify-center">
			<Title title="Perfil" />
			<div className="flex items-start gap-3 mt-2 rounded-md py-6 px-4 shadow-md w-full">
				<UserImage
					userId={session.user.id}
					className="rounded-full h-[100px] w-[100px] md:w-[150px] md:h-[150px] object-cover"
					src={userImage?.image ?? "/imgs/placeholder.jpg"}
					width={200}
					height={200}
					alt={session.user.name}
				/>

				<div className="flex flex-col ml-3 gap-2 h-max">
					<h4 className="font-bold">Nombre: {firstName}</h4>
					<h4 className="font-bold">Apellido: {lastName}</h4>
					<span className="text-sm sm:text-base">
						Email: {session.user.email}
					</span>

					{session.user.emailVerified ? (
						<p className="font-light text-sm sm:text-base">Email verificado</p>
					) : (
						<p className="font-light text-sm sm:text-base">
							Email no verificado
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

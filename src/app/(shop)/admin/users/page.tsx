// https://tailwindcomponents.com/component/hoverable-table

import { Title } from "@/components/ui/title/Title";

import { redirect } from "next/navigation";

import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/user/get-paginated-users";
import { Pagination } from "@/components/ui/pagination/Pagination";

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function UsersPage({ searchParams }: Props) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	const {
		ok,
		users = [],
		totalPages,
		currentPage,
	} = await getPaginatedUsers({ page });

	if (!ok) {
		redirect("/auth/login");
	}

	return (
		<>
			<Title title="Mantenimiento de usuarios" />

			<div className="mb-10">
				<UsersTable users={users} />
				<Pagination totalPages={totalPages!} />
			</div>
		</>
	);
}

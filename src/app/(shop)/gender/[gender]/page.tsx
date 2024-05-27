import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

export default async function CategoryPage({ params, searchParams }: Props) {
	const { gender } = params;

	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	const { products, totalPages, currentPage } =
		await getPaginatedProductsWithImages({ page, gender: gender as Gender });

	if (products.length === 0) {
		redirect(`/gender/${gender}`);
	}

	const labels: Record<string, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para niños",
		unisex: "para todos",
	};

	return (
		<div>
			<Title
				title={`Articulos de ${labels[gender]}`}
				subtitle="Todos los productos"
				className="mb-2"
			/>
			<ProductGrid products={products} />
			<Pagination totalPages={totalPages} />
		</div>
	);
}

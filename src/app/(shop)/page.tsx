import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Pagination } from "@/components/ui/pagination/Pagination";

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;

	const { products, totalPages, currentPage } =
		await getPaginatedProductsWithImages({ page });

	if (products.length === 0) {
		redirect("/");
	}

	return (
		<>
			<Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
			<ProductGrid products={products} />
			<Pagination totalPages={totalPages} />
		</>
	);
}

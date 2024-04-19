import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Category } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
	params: {
		id: Category;
	};
}
const seedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
	const { id } = params;

	const products = seedProducts.filter((product) => product.gender === id);

	// if (id === "kids") {
	// 	notFound();
	// }

	const labels: Record<Category, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para niños",
		unisex: "para todos",
	};

	return (
		<div>
			<Title
				title={`Articulos de ${labels[id]}`}
				subtitle="Todos los productos"
				className="mb-2"
			/>
			<ProductGrid products={products} />
		</div>
	);
}

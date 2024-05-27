import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
	// 1. Borrar registros previos
	await Promise.all([
		prisma.orderAddress.deleteMany(),
		prisma.orderItem.deleteMany(),
		prisma.order.deleteMany(),
		prisma.userAddress.deleteMany(),
		prisma.user.deleteMany(),
		prisma.country.deleteMany(),
		prisma.productImage.deleteMany(),
		prisma.product.deleteMany(),
		prisma.category.deleteMany(),
	]);

	const { categories, products, users } = initialData;

	//User
	await prisma.user.createMany({
		data: users,
	});

	//Country
	await prisma.country.createMany({
		data: countries,
	});

	//Categories
	const categoriesData = categories.map((category) => ({
		name: category,
	}));

	await prisma.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany();

	const categoriesMap = categoriesDB.reduce((map, category) => {
		map[category.name.toLocaleLowerCase()] = category.id;
		return map;
	}, {} as Record<string, string>); //<string = shirt, string = categoryID>

	products.forEach(async (product) => {
		const { type, images, ...rest } = product;
		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});

		//Images
		const imagesData = images.map((image) => ({
			url: image,
			productId: dbProduct.id,
		}));

		await prisma.productImage.createMany({
			data: imagesData,
		});
	});

	console.log("Ejecutado correctamente");
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();

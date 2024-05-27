export const generatePaginationNmubers = (
	currentPage: number,
	totalPages: number
) => {
	// Si el num total de paginas es 7 o menos
	//vamos a motrar todas las pags sin puntos suspensivos

	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	//si la pag actual esta entre las primeras 3 pags
	// mostrar las primeras 3, puntos suspensivos, y las ultimas 2

	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	//Si la pag actual esta entre las ultiams 3 pags
	//mostrar las primeras 2, puntos suspensivos, y las ultimas 3
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	//Si la pag actual esta en otro lugar medio
	//Mostrar la primera pagina, puntos suspensivos, pagina actual y vecinos
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

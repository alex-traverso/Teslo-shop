import { Footer } from "@/components/ui/footer/Footer";
import { Sidebar } from "@/components/ui/side-bar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen">
			<TopMenu />
			<Sidebar />
			<div className="px-0 sm:px-6">{children}</div>
			<Footer />
		</main>
	);
}

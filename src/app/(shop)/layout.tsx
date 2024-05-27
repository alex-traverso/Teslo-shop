import { Footer } from "@/components/ui/footer/Footer";
import { Sidebar } from "@/components/ui/side-bar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TopMenu />
			<Sidebar />
			<main className="min-h-[calc(100vh-8rem)]">
				<div className="px-6 sm:px-8">{children}</div>
			</main>
			<Footer />
		</>
	);
}

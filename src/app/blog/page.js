import { redirect } from "next/navigation";
import { BlogListingPage } from "@/views/BlogListingPage";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { JsonLd } from "@/components/JsonLd";
import { buildCollectionPageStructuredData } from "@/utils/structuredData";

import NotFound from "../not-found";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export async function generateMetadata() {
    try {
        const { pageAsset } = await getDotCMSPage("/blog");
        const pageTitle = pageAsset?.page?.friendlyName;
        const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
        const description = pageAsset?.page?.seoDescription || pageAsset?.page?.description || "Discover amazing destinations, travel tips, and unforgettable adventures."
        const url = `${baseUrl}/blog`;
        return {
            title,
            description,
            alternates: { canonical: url },
            openGraph: { title, description, url, type: "website" },
            twitter: { card: "summary_large_image", title, description }
        };
    } catch (e) {
        return { title: "Blog - Page not found" };
    }
}

export default async function Home() {
    const pageResponse = await getDotCMSPage("/blog");

    const vanityUrl = pageResponse?.pageAsset?.vanityUrl;
    const action = vanityUrl?.action ?? 0;

    if (action > 200) {
        return redirect(pageResponse.pageAsset.vanityUrl.forwardTo);
    }

    if (!pageResponse) {
        return <NotFound />;
    }

    const pageTitle = pageResponse?.pageAsset?.page?.friendlyName;
    const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
    const description = pageResponse?.pageAsset?.page?.seoDescription || pageResponse?.pageAsset?.page?.description || undefined;
    const jsonLd = buildCollectionPageStructuredData({ title, description, path: "/blog" });

    return (
        <>
            <JsonLd data={jsonLd} />
            <BlogListingPage {...pageResponse} />
        </>
    );
}

import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";
import { Page } from "@/views/Page";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { JsonLd } from "@/components/JsonLd";
import { buildWebPageStructuredData } from "@/utils/structuredData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ""

function buildMetadata({ title, description, path }) {
    const base = baseUrl.replace(/\/$/, "");
    const segment = path && path !== "/" ? (path.startsWith("/") ? path : `/${path}`) : "";
    const url = segment ? `${base}${segment}` : base || undefined;
    return {
        title: title || "Page",
        description: description || undefined,
        alternates: { canonical: url },
        openGraph: {
            title: title || undefined,
            description: description || undefined,
            url,
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: title || undefined,
            description: description || undefined
        }
    }
}

export async function generateMetadata(props) {
    const params = await props.params;
    try {
        const path = params?.slug?.join("/") || "/"
        const { pageAsset } = await getDotCMSPage(path)
        const page = pageAsset?.page
        const title = page?.friendlyName || page?.title
        const description = page?.seoDescription || page?.description || undefined
        return buildMetadata({ title, description, path })
    } catch (e) {
        return { title: "Not found" }
    }
}

export default async function Home(props) {
    const params = await props.params;
    const path = params?.slug?.join("/") || "/"
    const pageContent = await getDotCMSPage(path);

    const vanityUrl = pageContent?.pageAsset?.vanityUrl;
    const action = vanityUrl?.action ?? 0;

    if (action > 200) {
        return redirect(pageContent.pageAsset.vanityUrl.forwardTo);
    }

    if (!pageContent) {
        return <NotFound />;
    }

    const page = pageContent?.pageAsset?.page
    const title = page?.friendlyName || page?.title
    const description = page?.seoDescription || page?.description || undefined
    const jsonLd = buildWebPageStructuredData({ title, description, path })

    return (
        <>
            <JsonLd data={jsonLd} />
            <Page pageContent={pageContent} />
        </>
    )
}

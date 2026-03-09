import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";
import { DetailPage } from "@/views/DetailPage";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { JsonLd } from "@/components/JsonLd";
import {
    buildArticleStructuredData,
    getAbsoluteImageUrl
} from "@/utils/structuredData";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export async function generateMetadata(props) {
    const params = await props.params;
    try {
        const path = params.slug[0];
        const { pageAsset } = await getDotCMSPage(`/blog/post/${path}`);
        const urlContentMap = pageAsset?.urlContentMap;
        const title = urlContentMap?.title ? `${urlContentMap.title} - Blog` : "Blog";
        const description = urlContentMap?.description || urlContentMap?.teaser || undefined;
        const imageUrl = urlContentMap?.image?.idPath
            ? getAbsoluteImageUrl(urlContentMap.image.idPath)
            : undefined;
        const url = `${baseUrl}/blog/post/${path}`;
        return {
            title,
            description,
            alternates: { canonical: url },
            openGraph: {
                title,
                description,
                url,
                type: "article",
                ...(imageUrl && { images: [{ url: imageUrl }] })
            },
            twitter: {
                card: "summary_large_image",
                title,
                description
            }
        };
    } catch (e) {
        return { title: "Not found" };
    }
}

export default async function Home(props) {
    const params = await props.params;
    const path = params.slug[0];
    const pageContent = await getDotCMSPage(`/blog/post/${path}`);

    const vanityUrl = pageContent?.pageAsset?.vanityUrl;
    const action = vanityUrl?.action ?? 0;

    if (action > 200) {
        return redirect(pageContent.pageAsset.vanityUrl.forwardTo);
    }

    if (!pageContent) {
        return <NotFound />;
    }

    const urlContentMap = pageContent?.pageAsset?.urlContentMap;
    const author = urlContentMap?.author?.[0];
    const authorName = author
        ? [author.firstName, author.lastName].filter(Boolean).join(" ")
        : undefined;
    const imageUrl = urlContentMap?.image?.idPath
        ? getAbsoluteImageUrl(urlContentMap.image.idPath)
        : undefined;
    const jsonLd = buildArticleStructuredData({
        title: urlContentMap?.title,
        description: urlContentMap?.description || urlContentMap?.teaser,
        authorName,
        datePublished: urlContentMap?.postingDate,
        dateModified: urlContentMap?.modDate || urlContentMap?.postingDate,
        imageUrl,
        path: `/blog/post/${path}`
    });

    return (
        <>
            <JsonLd data={jsonLd} />
            <DetailPage pageContent={pageContent} />
        </>
    );
}

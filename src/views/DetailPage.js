"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { enableBlockEditorInline } from "@dotcms/uve";
import {
    DotCMSBlockEditorRenderer,
    useEditableDotCMSPage,
} from "@dotcms/react";

import { useIsEditMode } from "@/hooks/isEditMode";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";
import ShopifyProduct from "@/components/content-types/ShopifyProduct";
import { resolveDotCMSImageSrc } from "@/utils/dotcmsAssetUrl";

export function DetailPage({ pageContent }) {
    const [blockEditorClasses, setBlockEditorClasses] = useState(
        "max-w-none text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed",
    );
    const { pageAsset, content } = useEditableDotCMSPage(pageContent);
    const { urlContentMap } = pageAsset;
    const { blogContent } = urlContentMap || {};
    const blogHeroSrc = resolveDotCMSImageSrc(urlContentMap?.image);
    const navigation = content?.navigation;
    const isEditMode = useIsEditMode();

    useEffect(() => {
        if (isEditMode) {
            setBlockEditorClasses((prev) => {
                return `${prev} border-2 border-solid border-cyan-400 cursor-pointer`;
            });
        }
    }, [isEditMode]);

    const handleClick = () => {
        if (isEditMode) {
            enableBlockEditorInline(urlContentMap, "blogContent");
        }
    };

    return (
        <div className="">
            {pageAsset?.layout.header && (
                <Header navItems={navigation?.children} />
            )}
            <main className="container m-auto">
                <article className="w-full py-12 md:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4">
                        {urlContentMap?.title && (
                            <h1 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
                                {urlContentMap?.title}
                            </h1>
                        )}

                        <div className="flex items-center gap-4 mb-8 pb-6 border-gray-100">
                            {urlContentMap?.author?.firstName && urlContentMap?.author?.lastName && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <span className="text-primary-foreground text-sm font-semibold">
                                            JC
                                        </span>
                                    </div>
                                    <span className="text-foreground font-medium">
                                        {urlContentMap.author}
                                    </span>
                                </div>
                            )}
                            {urlContentMap?.postingDate && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <time className="text-sm">
                                        {new Date(urlContentMap.postingDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            )}
                        </div>

                        {blogHeroSrc && (
                            <div className="mb-8">
                                <div className="bg-gray-100 rounded-2xl p-2">
                                    <Image
                                        className="w-full h-auto object-cover rounded-xl"
                                        src={blogHeroSrc}
                                        width={800}
                                        height={400}
                                        alt={urlContentMap?.title || "Blog post image"}
                                    />
                                </div>
                            </div>
                        )}

                        <div onClick={handleClick} className="[&_p]:text-muted-foreground [&_p]:text-sm [&_p]:md:text-base [&_p]:lg:text-base [&_p]:font-normal [&_p]:leading-relaxed [&_p]:mb-4 [&_h1]:text-foreground [&_h1]:text-lg [&_h1]:md:text-xl [&_h1]:lg:text-2xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:mb-6 [&_h1]:mt-8 [&_h2]:text-foreground [&_h2]:text-lg [&_h2]:md:text-xl [&_h2]:lg:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:mb-6 [&_h2]:mt-8 [&_h3]:text-foreground [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:lg:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:mb-4 [&_h3]:mt-6 [&_ul]:mb-4 [&_ul]:mt-4 [&_ol]:mb-4 [&_ol]:mt-4 [&_li]:text-muted-foreground [&_li]:text-sm [&_li]:md:text-base [&_li]:lg:text-base [&_li]:font-normal [&_li]:leading-relaxed [&_li]:mb-2 [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:list-disc [&_ol]:list-decimal [&_a]:text-primary [&_a]:hover:text-primary-dark [&_strong]:text-foreground [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:my-8 [&_img]:w-full [&_img]:h-auto [&_img]:object-cover">
                            <DotCMSBlockEditorRenderer
                                blocks={blogContent}
                                className={blockEditorClasses}
                                customRenderers={customeRenderers}
                            />
                        </div>
                    </div>
                </article>
            </main>

            {pageAsset?.layout.footer && <Footer {...content} />}
        </div>
    );
}

const customeRenderers = {
    Activity: (props) => {
        const data = props.node?.attrs?.data;
        if (!data) return null;
        const { title, description } = data;
        return (
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        );
    },
    Product: (props) => {
        const data = props.node?.attrs?.data;
        if (!data) return null;
        const { title, description } = data;
        return (
            <div>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    },
    dotShopifyProduct: (props) => {
        const contentletData = props.node?.attrs?.data;
        if (!contentletData) return null;
        return <ShopifyProduct {...contentletData} />;
    },
};

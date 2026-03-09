"use client";

import Image from "next/image";

export const customRenderers = {
    dotImage: (props) => {
        const attrs = props.node?.attrs ?? props.attrs ?? props
        const src = typeof attrs.data === "object" && attrs.data?.identifier
            ? attrs.data.identifier
            : attrs.src
        const alt = attrs.alt ?? attrs.title ?? ""

        if (!src) return null

        return (
            <span className="block my-8 w-full [&>span]:!block [&>span]:!rounded-xl [&>span]:!overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover rounded-xl"
                />
            </span>
        )
    }
}

"use client"

import { DotCMSEditableText } from "@dotcms/react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HEADING_SIZE_CLASS = {
    sm: "text-2xl md:text-3xl lg:text-4xl",
    md: "text-3xl md:text-4xl lg:text-5xl",
    lg: "text-3xl md:text-4xl lg:text-6xl",
    xl: "text-4xl md:text-5xl lg:text-7xl"
}

const CAPTION_SIZE_CLASS = {
    sm: "text-sm md:text-base lg:text-base",
    md: "text-base md:text-lg lg:text-lg",
    lg: "text-base md:text-base lg:text-lg"
}

const SECTION_SPACING_CLASS = {
    compact: "py-8 md:py-10 lg:py-12",
    default: "py-12 md:py-16 lg:py-20",
    spacious: "py-16 md:py-24 lg:py-32"
}

const TEXT_ALIGN_CLASS = {
    left: "text-left mr-auto ml-0",
    center: "text-center mx-auto",
    right: "text-right ml-auto mr-0"
}

const CAPTION_BLOCK_ALIGN_CLASS = {
    center: "mx-auto text-center",
    left: "mr-auto ml-0 text-left",
    right: "ml-auto mr-0 text-right"
}

const HEADLINE_ALIGN_CLASS = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
}

const HEADING_COLOR_CLASS = {
    foreground: "text-foreground",
    primary: "text-primary",
    "primary-dark": "text-primary-dark",
    "secondary-foreground": "text-secondary-foreground"
}

const CTA_VARIANT_VALUES = new Set(["default", "outline", "secondary"])

const MEDIA_LAYOUT_VALUES = new Set([
    "image-top",
    "image-bottom",
    "image-left",
    "image-right"
])

/** UVE field ids may be camelCase (textAlign) or kebab-case (text-align). */
function styleProp (dotStyleProperties, ...keys) {
    for (const key of keys) {
        const value = dotStyleProperties?.[key]
        if (value !== undefined && value !== null && value !== "") {
            return value
        }
    }
    return undefined
}

/**
 * Maps UVE Style Editor values (dotStyleProperties) to Banner presentation.
 * @see https://dev.dotcms.com/docs/sdk-uve-library#style-editor
 */
function getBannerStyles (dotStyleProperties = {}) {
    const headingSize = styleProp(dotStyleProperties, "headingSize", "heading-size")
    const captionSize = styleProp(dotStyleProperties, "captionSize", "caption-size")
    const headingColor = styleProp(dotStyleProperties, "headingColor", "heading-color")
    const sectionSpacing = styleProp(
        dotStyleProperties,
        "sectionSpacing",
        "section-spacing"
    )
    const textAlignRaw = styleProp(dotStyleProperties, "textAlign", "text-align")
    const mediaLayoutRaw = styleProp(dotStyleProperties, "mediaLayout", "media-layout")
    const imageStyle =
        styleProp(dotStyleProperties, "imageStyle", "image-style") ?? {}
    const ctaVariantRaw = styleProp(dotStyleProperties, "ctaVariant", "cta-variant")

    const textAlign =
        textAlignRaw === "left" || textAlignRaw === "right" || textAlignRaw === "center"
            ? textAlignRaw
            : "center"

    const mediaLayout = MEDIA_LAYOUT_VALUES.has(mediaLayoutRaw)
        ? mediaLayoutRaw
        : "image-bottom"

    const isSplit =
        mediaLayout === "image-left" || mediaLayout === "image-right"

    return {
        headingClass: HEADING_SIZE_CLASS[headingSize] ?? HEADING_SIZE_CLASS.lg,
        headingColorClass:
            HEADING_COLOR_CLASS[headingColor] ?? HEADING_COLOR_CLASS.foreground,
        captionClass: CAPTION_SIZE_CLASS[captionSize] ?? CAPTION_SIZE_CLASS.lg,
        sectionClass:
            SECTION_SPACING_CLASS[sectionSpacing] ?? SECTION_SPACING_CLASS.default,
        textAlign,
        textBlockClass: TEXT_ALIGN_CLASS[textAlign],
        captionBlockClass: CAPTION_BLOCK_ALIGN_CLASS[textAlign],
        headlineAlignClass: HEADLINE_ALIGN_CLASS[textAlign],
        imageStyle,
        ctaVariant: CTA_VARIANT_VALUES.has(ctaVariantRaw) ? ctaVariantRaw : "default",
        mediaLayout,
        isSplit,
        sideBySide: isSplit
    }
}

function imageShellClassName (imageStyle) {
    return cn(
        "bg-gray-100 p-2 w-full",
        imageStyle.rounded && "rounded-3xl",
        !imageStyle.rounded && "rounded-2xl",
        imageStyle.shadow && "shadow-xl",
        imageStyle.border &&
            "ring-2 ring-border ring-offset-2 ring-offset-background"
    )
}

function BannerImage ({ alt, image, imageStyle, sideBySide }) {
    const src = image?.idPath || image?.identifier || image
    if (!src) {
        return null
    }

    const roundedInner = imageStyle.rounded ? "rounded-2xl" : "rounded-xl"

    if (sideBySide) {
        return (
            <div
                className={cn(
                    "relative min-h-[220px] w-full overflow-hidden md:min-h-[300px]",
                    imageShellClassName(imageStyle)
                )}
            >
                <Image
                    src={src}
                    alt={alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn("object-cover", roundedInner)}
                />
            </div>
        )
    }

    return (
        <div className={imageShellClassName(imageStyle)}>
            <Image
                src={src}
                width={1200}
                height={500}
                alt={alt || ""}
                className={cn(
                    "h-auto w-full max-h-[500px] object-cover",
                    roundedInner
                )}
            />
        </div>
    )
}

export default function Banner (props) {
    const { title, caption, image, link, buttonText, dotStyleProperties } = props
    const styles = getBannerStyles(dotStyleProperties)

    const {
        headingClass,
        headingColorClass,
        captionClass,
        sectionClass,
        textAlign,
        textBlockClass,
        captionBlockClass,
        headlineAlignClass,
        imageStyle,
        ctaVariant,
        mediaLayout,
        isSplit,
        sideBySide
    } = styles

    const textStack = (
        <div
            className={cn(
                !isSplit && "px-4",
                !isSplit && "max-w-4xl",
                !isSplit && textBlockClass,
                isSplit && "flex w-full flex-col justify-center md:py-2",
                isSplit && headlineAlignClass
            )}
        >
            <h1
                className={cn(
                    "mb-4 font-semibold leading-tight",
                    headingColorClass,
                    !isSplit && headlineAlignClass,
                    headingClass
                )}
            >
                <DotCMSEditableText contentlet={props} fieldName="title" />
            </h1>

            <p
                className={cn(
                    "text-muted-foreground mb-8 max-w-lg font-medium leading-relaxed",
                    captionBlockClass,
                    captionClass
                )}
            >
                {caption}
            </p>

            {link && buttonText && (
                <div
                    className={cn(
                        textAlign === "center" && "flex justify-center",
                        textAlign === "right" && "flex justify-end",
                        textAlign === "left" && "flex justify-start"
                    )}
                >
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant={ctaVariant}
                            className="rounded-full px-8 py-3 text-base font-medium shadow-lg ring-1 ring-white/10 transition-colors"
                        >
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )

    const imageBlock = image ? (
        <div
            className={cn(
                !isSplit && "max-w-6xl px-4",
                isSplit && "w-full",
                mediaLayout === "image-bottom" && "mx-auto mt-12",
                mediaLayout === "image-top" && "mx-auto mb-10 md:mb-12"
            )}
        >
            <BannerImage
                alt={title}
                image={image}
                imageStyle={imageStyle}
                sideBySide={sideBySide}
            />
        </div>
    ) : null

    return (
        <section className={cn("w-full", sectionClass)}>
            {mediaLayout === "image-top" && image && imageBlock}

            {isSplit && image && (
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 lg:gap-12">
                    {mediaLayout === "image-left" && (
                        <>
                            {imageBlock}
                            {textStack}
                        </>
                    )}
                    {mediaLayout === "image-right" && (
                        <>
                            <div className="order-2 md:order-1">{textStack}</div>
                            <div className="order-1 md:order-2">{imageBlock}</div>
                        </>
                    )}
                </div>
            )}

            {isSplit && !image && (
                <div className={cn("mx-auto max-w-4xl px-4", textBlockClass)}>
                    {textStack}
                </div>
            )}

            {!isSplit && (
                <>
                    {mediaLayout !== "image-top" && textStack}
                    {mediaLayout === "image-bottom" && image && imageBlock}
                </>
            )}

            {mediaLayout === "image-top" && textStack}
        </section>
    )
}

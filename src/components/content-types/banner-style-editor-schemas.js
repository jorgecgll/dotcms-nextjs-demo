import { defineStyleEditorSchema, styleEditorField } from "@dotcms/uve"

/**
 * Absolute URLs so dotCMS UVE can load radio preview images (iframe may differ from admin origin).
 * Falls back to relative paths if no origin (previews may still work when editor shares origin).
 */
function layoutPreviewUrl (origin, filename) {
    const path = `/style-editor/${filename}`
    const base = (origin || "").replace(/\/$/, "")
    return base ? `${base}${path}` : path
}

/**
 * Style Editor schemas for the Banner content type (hero).
 * @param {string} [origin] — e.g. https://localhost:3000 from window.location.origin or NEXT_PUBLIC_SITE_URL
 * @see https://dev.dotcms.com/docs/sdk-uve-library#style-editor
 */
export function createBannerStyleEditorSchemas (origin) {
    const img = (filename) => layoutPreviewUrl(origin, filename)

    return [
        defineStyleEditorSchema({
            contentType: "Banner",
            sections: [
                {
                    title: "Typography",
                    fields: [
                        styleEditorField.dropdown({
                            id: "heading-size",
                            label: "Heading size",
                            options: [
                                { label: "Small", value: "sm" },
                                { label: "Medium", value: "md" },
                                { label: "Large", value: "lg" },
                                { label: "Extra large", value: "xl" }
                            ]
                        }),
                        styleEditorField.dropdown({
                            id: "caption-size",
                            label: "Caption size",
                            options: [
                                { label: "Small", value: "sm" },
                                { label: "Medium", value: "md" },
                                { label: "Large", value: "lg" }
                            ]
                        }),
                        styleEditorField.radio({
                            id: "heading-color",
                            label: "Heading color",
                            columns: 2,
                            options: [
                                {
                                    label: "Charcoal",
                                    value: "foreground",
                                    imageURL: img(
                                        "banner-heading-color-foreground.svg"
                                    )
                                },
                                {
                                    label: "Brand blue",
                                    value: "primary",
                                    imageURL: img(
                                        "banner-heading-color-primary.svg"
                                    )
                                },
                                {
                                    label: "Deep blue",
                                    value: "primary-dark",
                                    imageURL: img(
                                        "banner-heading-color-primary-dark.svg"
                                    )
                                },
                                {
                                    label: "Navy",
                                    value: "secondary-foreground",
                                    imageURL: img(
                                        "banner-heading-color-secondary-foreground.svg"
                                    )
                                }
                            ]
                        })
                    ]
                },
                {
                    title: "Hero layout",
                    fields: [
                        styleEditorField.radio({
                            id: "media-layout",
                            label: "Image position",
                            columns: 2,
                            options: [
                                {
                                    label: "Image top",
                                    value: "image-top",
                                    imageURL: img("banner-image-top.svg")
                                },
                                {
                                    label: "Image bottom",
                                    value: "image-bottom",
                                    imageURL: img("banner-image-bottom.svg")
                                },
                                {
                                    label: "Image left",
                                    value: "image-left",
                                    imageURL: img("banner-image-left.svg")
                                },
                                {
                                    label: "Image right",
                                    value: "image-right",
                                    imageURL: img("banner-image-right.svg")
                                }
                            ]
                        })
                    ]
                },
                {
                    title: "Layout",
                    fields: [
                        styleEditorField.radio({
                            id: "text-align",
                            label: "Text alignment",
                            options: [
                                { label: "Left", value: "left" },
                                { label: "Center", value: "center" },
                                { label: "Right", value: "right" }
                            ]
                        }),
                        styleEditorField.dropdown({
                            id: "section-spacing",
                            label: "Vertical spacing",
                            options: [
                                { label: "Compact", value: "compact" },
                                { label: "Default", value: "default" },
                                { label: "Spacious", value: "spacious" }
                            ]
                        })
                    ]
                },
                {
                    title: "Image",
                    fields: [
                        styleEditorField.checkboxGroup({
                            id: "image-style",
                            label: "Image options",
                            options: [
                                { label: "Drop shadow", key: "shadow" },
                                { label: "Border frame", key: "border" },
                                { label: "Larger rounded corners", key: "rounded" }
                            ]
                        })
                    ]
                },
                {
                    title: "Call to action",
                    fields: [
                        styleEditorField.dropdown({
                            id: "cta-variant",
                            label: "Button style",
                            options: [
                                { label: "Primary", value: "default" },
                                { label: "Outline", value: "outline" },
                                { label: "Secondary", value: "secondary" }
                            ]
                        })
                    ]
                }
            ]
        })
    ]
}

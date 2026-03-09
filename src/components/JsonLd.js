/**
 * Renders Schema.org JSON-LD script for SEO.
 * Escapes `<` to prevent XSS while keeping JSON valid (per Next.js SEO best practices).
 * Safe to use in server components.
 */
export function JsonLd({ data }) {
    if (!data || Object.keys(data).length === 0) return null
    const safeJson = JSON.stringify(data).replace(/</g, "\\u003c")
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJson }}
        />
    )
}

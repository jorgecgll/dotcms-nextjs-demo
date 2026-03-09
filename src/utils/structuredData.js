/**
 * Builds Schema.org JSON-LD for SEO.
 * @see https://schema.org
 */

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || ""
}

function toAbsoluteUrl(path) {
    const base = getBaseUrl().replace(/\/$/, "")
    const pathStr = path.startsWith("/") ? path : `/${path}`
    return pathStr === "/" ? base : `${base}${pathStr}`
}

/**
 * WebPage structured data for generic pages.
 */
export function buildWebPageStructuredData({ title, description, path }) {
    const url = toAbsoluteUrl(path || "/")
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title || undefined,
        description: description || undefined,
        url: url || undefined
    }
}

/**
 * CollectionPage structured data for blog listing.
 */
export function buildCollectionPageStructuredData({ title, description, path }) {
    const url = toAbsoluteUrl(path || "/blog")
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title || "Blog",
        description: description || undefined,
        url: url || undefined
    }
}

/**
 * Article / BlogPosting structured data for blog posts.
 * Uses BlogPosting (Schema.org subtype of Article) for better rich result eligibility.
 */
export function buildArticleStructuredData({
    title,
    description,
    authorName,
    datePublished,
    dateModified,
    imageUrl,
    path
}) {
    const url = path ? toAbsoluteUrl(path) : undefined
    const article = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title || undefined,
        description: description || undefined,
        url: url || undefined,
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        author: authorName
            ? { "@type": "Person", name: authorName }
            : undefined,
        image: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined
    }
    return article
}

/**
 * Returns absolute image URL for dotCMS assets (OG/JSON-LD).
 * Accepts idPath, inode, or full URL.
 */
export function getAbsoluteImageUrl(idPathOrUrl) {
    if (!idPathOrUrl || typeof idPathOrUrl !== "string") return null
    if (idPathOrUrl.startsWith("http")) return idPathOrUrl
    const host = (process.env.NEXT_PUBLIC_DOTCMS_HOST || "").replace(/\/$/, "")
    if (!host) return null
    const path = idPathOrUrl.startsWith("/dA/") ? idPathOrUrl : `/dA/${idPathOrUrl}`
    return `${host}${path}`
}

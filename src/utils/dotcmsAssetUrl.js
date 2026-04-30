/**
 * dotCMS may return asset URLs with a "system host" placeholder (resolves in the
 * browser as https://system%20host/dA/...), or root-relative /dA/ paths.
 * Anchor those to NEXT_PUBLIC_DOTCMS_HOST so images load in the app.
 */
function isDotCMSPlaceholderHost (hostname) {
    if (!hostname) return false
    const n = String(hostname).toLowerCase()
    if (n === "system%20host") return true
    if (n.replace(/%20/g, " ") === "system host") return true
    return n === "system host"
}

export function normalizeDotCMSAssetUrl (src) {
    if (src == null) return null
    const s = typeof src === "string" ? src : String(src)
    if (!s) return null

    const base = (process.env.NEXT_PUBLIC_DOTCMS_HOST || "").trim().replace(/\/$/, "")
    if (!base) return s

    if (s.startsWith("/dA/") || s.startsWith("/contentAsset/")) {
        return `${base}${s}`
    }

    if (/^https?:\/\//i.test(s)) {
        if (/^https?:\/\/(system%20host|system\s*host)(?=\/|:\d)/i.test(s)) {
            return s.replace(/^https?:\/\/(system%20host|system\s*host)/i, base)
        }
        try {
            const u = new URL(s)
            if (isDotCMSPlaceholderHost(u.hostname)) {
                return `${base}${u.pathname}${u.search}${u.hash}`
            }
        } catch {
            /* ignore */
        }
        return s
    }

    return s
}

/**
 * Image field from GraphQL may be a string URL, Binary (idPath), or File asset
 * (fileAsset { idPath, versionPath }). Returns a safe src for next/image or null.
 */
export function resolveDotCMSImageSrc (image) {
    if (image == null) return null
    if (typeof image === "string") {
        const s = image.trim()
        if (!s) return null
        return normalizeDotCMSAssetUrl(s)
    }
    const raw =
        image?.fileAsset?.idPath ||
        image?.fileAsset?.versionPath ||
        image?.idPath ||
        image?.versionPath ||
        image?.identifier
    if (raw == null) return null
    const s = String(raw).trim()
    if (!s) return null
    return normalizeDotCMSAssetUrl(s)
}

const ImageLoader = ({ src, width = 250 }) => {
    if (src == null || src === "") {
        return src
    }
    const s = typeof src === "string" ? src.trim() : String(src)
    if (!s) {
        return src
    }

    // Absolute URL: dotCMS / Next must not prefix the host again (would yield host+host in srcset)
    if (/^https?:\/\//i.test(s)) {
        const u = new URL(s)
        return `${u.origin}${u.pathname}${u.search || ""}/${width}w`
    }

    const dotcmsURL = new URL(process.env.NEXT_PUBLIC_DOTCMS_HOST).origin
    const imageSRC = s.includes("/dA/") ? s : `/dA/${s}`

    return `${dotcmsURL}${imageSRC}/${width}w`
}

export default ImageLoader

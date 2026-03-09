function getVideoUrl(asset) {
    if (!asset) return null
    const id = typeof asset === 'object' ? (asset.idPath || asset.identifier || asset.inode) : asset
    if (!id) return null
    const dotcmsURL = new URL(process.env.NEXT_PUBLIC_DOTCMS_HOST).origin
    const path = String(id).includes('/dA/') ? id : `/dA/${id}`
    return `${dotcmsURL}${path}`
}

export default function Video(props) {
    const { asset, title } = props
    const videoSrc = getVideoUrl(asset)

    if (!videoSrc) {
        return null
    }

    return (
        <section className="w-full py-4 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
                    <video
                        className="w-full h-auto"
                        controls
                        playsInline
                        preload="metadata"
                        title={title || 'Video'}
                    >
                        <source src={videoSrc} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    )
}

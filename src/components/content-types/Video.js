"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Play, AlertCircle, Loader2 } from "lucide-react"
import { resolveDotCMSImageSrc } from "@/utils/dotcmsAssetUrl"

// loading | playing | need-interaction | error

export default function Video (props) {
    const { title } = props
    const src = resolveDotCMSImageSrc(props?.asset)
    const videoRef = useRef(null)
    const escapeTimer = useRef(null)
    const [coverOn, setCoverOn] = useState(true)
    const [status, setStatus] = useState("loading")

    const label = (title || "").trim() || "Video"

    const startPlayback = useCallback(() => {
        const v = videoRef.current
        if (!v) return
        v.muted = true
        const p = v.play()
        if (p && typeof p.then === "function") {
            p.then(() => {
                /* onPlaying will hide cover */
            }).catch(() => {
                setStatus("need-interaction")
            })
        }
    }, [])

    useEffect(() => {
        if (!src) return
        setCoverOn(true)
        setStatus("loading")
        if (escapeTimer.current) {
            clearTimeout(escapeTimer.current)
        }
        // After first paint, try muted autoplay (browsers allow; shows frames immediately when it works)
        const id = window.setTimeout(() => {
            startPlayback()
        }, 0)
        // Stuck on loading (slow or blocked) — make native controls + tap CTA available
        escapeTimer.current = window.setTimeout(() => {
            setStatus((s) => (s === "loading" ? "need-interaction" : s))
        }, 10000)
        return () => {
            clearTimeout(id)
            if (escapeTimer.current) {
                clearTimeout(escapeTimer.current)
            }
        }
    }, [src, startPlayback])

    if (!src) {
        return null
    }

    return (
        <section className="w-full my-8 md:my-12" aria-label={label}>
            <div className="w-full max-w-6xl mx-auto px-4">
                <div
                    className="relative w-full min-h-[min(50vh,480px)] overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950"
                >
                    {coverOn && status !== "error" && (
                        <div
                            className={
                                status === "need-interaction"
                                    ? "absolute inset-x-0 top-0 bottom-16 z-20 flex items-center justify-center p-4 sm:bottom-20"
                                    : "absolute inset-0 z-20 flex items-center justify-center p-4"
                            }
                        >
                            {status === "loading" && (
                                <div
                                    className="pointer-events-none flex min-h-[200px] w-full max-w-sm flex-col items-center justify-center gap-3 text-center"
                                >
                                    <div className="absolute inset-0 -z-10 overflow-hidden rounded-t-xl">
                                        <div className="video-poster-shimmer absolute -inset-[50%] opacity-30 bg-gradient-to-r from-primary/30 via-amber-400/15 to-primary/25" />
                                    </div>
                                    <Loader2 className="h-10 w-10 text-amber-100/95" />
                                    <p className="text-sm font-medium text-zinc-100/95">
                                        Loading video…
                                    </p>
                                </div>
                            )}

                            {status === "need-interaction" && (
                                <div className="flex w-full max-w-md flex-col items-center gap-4 text-center sm:px-2">
                                    <p className="text-xs text-zinc-400/95">
                                        Muted playback could not start automatically. Use the bar below, or
                                        tap the button.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={startPlayback}
                                        className="group inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-zinc-400/40 bg-zinc-950/70 text-white shadow-xl ring-4 ring-primary/20 transition-transform hover:scale-105"
                                        aria-label="Play video"
                                    >
                                        <Play
                                            className="h-10 w-10 pl-0.5 transition group-hover:scale-105"
                                            fill="currentColor"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {status === "error" && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-xl bg-zinc-900/90 p-6 text-zinc-300">
                            <AlertCircle className="h-10 w-10 text-destructive/90" />
                            <p className="text-sm">Video could not be loaded</p>
                        </div>
                    )}

                    <video
                        ref={videoRef}
                        className="relative z-10 w-full h-full min-h-[min(50vh,480px)] object-contain bg-zinc-900/50"
                        controls
                        playsInline
                        muted
                        autoPlay
                        preload="auto"
                        title={label}
                        onPlaying={() => {
                            if (escapeTimer.current) {
                                clearTimeout(escapeTimer.current)
                            }
                            setStatus("playing")
                            setCoverOn(false)
                        }}
                        onError={() => {
                            if (escapeTimer.current) {
                                clearTimeout(escapeTimer.current)
                            }
                            setStatus("error")
                            setCoverOn(true)
                        }}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    )
}

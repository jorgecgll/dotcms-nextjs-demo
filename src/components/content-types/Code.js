import React from "react"

export default function Code(props) {
    const { code } = props
    const markup = code ?? ""

    if (!markup) return null

    return (
        <section className="w-full py-6 md:py-8">
            <div
                className="max-w-6xl mx-auto px-4 text-foreground [&_a]:text-primary [&_a]:underline [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4"
                dangerouslySetInnerHTML={{ __html: markup }}
            />
        </section>
    )
}

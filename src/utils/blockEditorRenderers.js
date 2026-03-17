"use client";

import { useState } from "react"
import Image from "next/image";
import { DotCMSBlockEditorRenderer } from "@dotcms/react";

function extractTextFromNode (node) {
    if (!node) return ""
    if (node.type === "text") return node.text ?? ""
    if (Array.isArray(node.content)) return node.content.map(extractTextFromNode).join("")
    return ""
}

function getFirstHeaderCellText (tableNode) {
    const rows = tableNode?.content ?? []
    const headerRow = rows[0]
    const cells = headerRow?.content ?? []
    const firstCell = cells[0]
    return extractTextFromNode(firstCell).trim().toLowerCase()
}

function cellDoc (content) {
    return { type: "doc", attrs: {}, content: content ?? [] }
}

function TableAsAccordion ({ node }) {
    const [openIndices, setOpenIndices] = useState(() => new Set())
    const rows = node?.content ?? []
    const headerRow = rows[0]
    const bodyRow = rows[1]
    if (!headerRow || !bodyRow) return null
    const headerCells = headerRow.content ?? []
    const bodyCells = bodyRow.content ?? []
    const items = []
    for (let i = 1; i < headerCells.length; i++) {
        const title = extractTextFromNode(headerCells[i]).trim()
        const cellContent = bodyCells[i]?.content ?? []
        items.push({ title, content: cellContent })
    }
    if (items.length === 0) return null
    const toggleIndex = (index) => {
        setOpenIndices((prev) => {
            const next = new Set(prev)
            if (next.has(index)) next.delete(index)
            else next.add(index)
            return next
        })
    }
    return (
        <div className="my-8 flex flex-col gap-2">
            {items.map((item, index) => {
                const isOpen = openIndices.has(index)
                return (
                    <div key={index} className="rounded-lg border border-border overflow-hidden bg-card shadow-sm">
                        <button
                            type="button"
                            onClick={() => toggleIndex(index)}
                            className="flex w-full cursor-pointer items-center justify-between gap-3 bg-primary px-5 py-4 text-left text-primary-foreground font-semibold text-base leading-snug transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            aria-expanded={isOpen}
                        >
                            <span className="flex-1">{item.title}</span>
                            <span
                                className={`shrink-0 text-primary-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                                aria-hidden
                            >
                                ›
                            </span>
                        </button>
                        {isOpen && (
                            <div className="bg-muted/50 border-t border-border px-5 py-5 text-foreground text-[15px] leading-relaxed [&_p]:mb-3 [&_p]:text-[15px] [&_p]:text-foreground [&_p:last-child]:mb-0 [&_ul]:my-3 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:text-foreground [&_li]:text-[15px]">
                                <DotCMSBlockEditorRenderer
                                    blocks={cellDoc(item.content)}
                                    customRenderers={customRenderers}
                                    className="[&_p]:text-foreground [&_p]:text-[15px]"
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

function TableDefault ({ node }) {
    const rows = node?.content ?? []
    const headerRow = rows[0]
    const bodyRows = rows.slice(1)
    return (
        <div className="my-6 overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse border-border text-sm">
                {headerRow && (
                    <thead>
                        <tr>
                            {(headerRow.content ?? []).map((cell, i) => (
                                <th
                                    key={i}
                                    className="border border-border px-3 py-2.5 text-left font-semibold bg-muted text-foreground"
                                    colSpan={cell.attrs?.colspan ?? 1}
                                    rowSpan={cell.attrs?.rowspan ?? 1}
                                >
                                    <DotCMSBlockEditorRenderer
                                        blocks={cellDoc(cell.content)}
                                        customRenderers={customRenderers}
                                        className="[&_p]:mb-0 [&_p]:text-inherit"
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {bodyRows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-card">
                            {(row.content ?? []).map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-border px-3 py-2.5 text-foreground"
                                    colSpan={cell.attrs?.colspan ?? 1}
                                    rowSpan={cell.attrs?.rowspan ?? 1}
                                >
                                    <DotCMSBlockEditorRenderer
                                        blocks={cellDoc(cell.content)}
                                        customRenderers={customRenderers}
                                        className="[&_p]:mb-0 [&_p]:text-foreground"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function TableRenderer ({ node }) {
    const firstHeaderText = getFirstHeaderCellText(node)
    if (firstHeaderText === "accordion") {
        return <TableAsAccordion node={node} />
    }
    return <TableDefault node={node} />
}

function GridBlock ({ node, children }) {
    const columns = node?.attrs?.columns ?? [6, 6]
    const gridTemplateColumns = columns.map((c) => `${c}fr`).join(" ")
    return (
        <div
            className="grid gap-6 my-6 w-full"
            style={{ gridTemplateColumns }}
        >
            {children}
        </div>
    )
}

function GridColumn ({ children }) {
    return <div className="min-w-0">{children}</div>
}

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
    },

    table: (props) => {
        const node = props.node ?? props
        const rows = node?.content
        if (!Array.isArray(rows)) return null
        return <TableRenderer node={node} />
    },

    gridBlock: (props) => <GridBlock {...props} />,
    gridColumn: (props) => <GridColumn {...props} />
}

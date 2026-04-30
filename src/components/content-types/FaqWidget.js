"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQItem = ({ question, answer, isOpen, onToggle }) => {

    const handleClick = (e) => {
        e.preventDefault()
        onToggle()
    }
    return (
        <div
            className={`w-full bg-[#fdfdfb] rounded-2xl border group transition-all duration-200 hover:shadow-lg cursor-pointer overflow-hidden`}
            onClick={handleClick}
        >
            <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-200 ease-out">
                <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
                <div className="flex justify-center items-center">
                    <ChevronDown
                        className={`w-6 h-6 text-muted-foreground transition-all duration-200 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
                    />
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                style={{
                    transitionProperty: "max-height, opacity, padding",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    className={`px-5 transition-all duration-200 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
                >
                    <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
                </div>
            </div>
        </div>
    )
}

export default function FaqWidget(props) {

    const { title, description, faq } = props

    const [openItems, setOpenItems] = useState(new Set())
    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index)
        } else {
            newOpenItems.add(index)
        }
        setOpenItems(newOpenItems)
    }
    return (
        <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
            <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
            <div className="self-stretch pt-4 pb-4 md:pt-8 md:pb-8 flex flex-col justify-center items-center gap-2 relative z-10">
                <div className="flex flex-col justify-start items-center gap-4">
                    <h2 className="w-full max-w-[435px] text-center text-foreground text-2xl font-semibold leading-10 break-words">
                        {title}
                    </h2>
                    <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
                        {description}
                    </p>
                </div>
            </div>
            <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
                {(Array.isArray(faq) ? faq : []).map((item, index) => (
                    <FAQItem key={index} {...item} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
                ))}
            </div>
        </section>
    )
}

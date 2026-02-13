import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DotCMSEditableText } from "@dotcms/react";

export default function Banner(props) {
    const { title, caption, image, link, buttonText } = props;
    
    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Main heading */}
                <h1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight mb-4">
                    <DotCMSEditableText
                        contentlet={props}
                        fieldName="title"
                    />
                </h1>
                
                {/* Subtitle */}
                <p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto mb-8">
                    {caption}
                </p>
                
                {/* CTA Button */}
                {link && buttonText && (
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10 transition-colors">
                            {buttonText}
                        </Button>
                    </Link>
                )}
            </div>
            
            {/* Image section */}
            {image && (
                <div className="max-w-6xl mx-auto px-4 mt-12">
                    <div className="bg-gray-100 rounded-2xl p-2">
                        <Image
                            src={image?.idPath || image?.identifier || image}
                            width={1200}
                            height={500}
                            alt={title}
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

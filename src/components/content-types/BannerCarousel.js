/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { resolveDotCMSImageSrc } from "@/utils/dotcmsAssetUrl";

export default function BannerCarousel(props) {
    const banners =
        props?.banners || props?.widgetCodeJSON?.banners || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const length = banners?.length || 1;
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + banners.length) % banners.length,
        );
    };

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full mb-12 md:mb-16 lg:mb-20">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-[600px]">
                {/* Left Panel - Text Content */}
                <div className="relative bg-background p-6 md:p-8 lg:p-12 lg:pl-20 lg:flex lg:items-center lg:min-h-[600px]">
                    <div className="max-w-xl w-full relative">
                        {banners.map(({ title, caption, tag, link, buttonText }, index) => (
                            <div
                                key={index}
                                className={`duration-700 ease-in-out transition-opacity ${
                                    index === currentIndex
                                        ? "opacity-100 relative"
                                        : "opacity-0 absolute inset-0 pointer-events-none"
                                }`}
                                data-carousel-item
                            >
                                <div className="flex flex-col justify-center min-h-[250px] md:min-h-[300px] lg:min-h-0">
                                    {tag && (
                                        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-muted-foreground bg-muted rounded-full">
                                            {tag}
                                        </span>
                                    )}
                                    {title && (
                                        <h1 className="text-foreground text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
                                            {title}
                                        </h1>
                                    )}
                                    {caption && (
                                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                                            {caption}
                                        </p>
                                    )}
                                    {link && buttonText && (
                                        <Link href={link} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10 transition-colors">
                                                {buttonText}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Image */}
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-auto lg:min-h-[600px] px-6 md:px-0">
                    <div className="relative overflow-hidden bg-muted rounded-2xl w-full h-full">
                        {banners.map(({ image, title }, index) => {
                            const imageSrc = resolveDotCMSImageSrc(image)
                            return (
                            <div
                                key={index}
                                className={`duration-700 ease-in-out absolute inset-0 w-full h-full ${
                                    index === currentIndex
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none"
                                }`}
                                data-carousel-item
                            >
                                {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    fill={true}
                                    className="object-cover rounded-2xl"
                                    alt={title || "Banner image"}
                                />
                                ) : (
                                <div
                                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground"
                                    role="img"
                                    aria-label={title || "Banner image slot"}
                                >
                                    Image unavailable
                                </div>
                                )}
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                type="button"
                onClick={prevSlide}
                className="hidden md:flex absolute top-1/2 left-4 lg:left-4 -translate-y-1/2 z-30 items-center justify-center cursor-pointer group focus:outline-none transition-all duration-200"
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm group-hover:bg-white group-focus:ring-4 group-focus:ring-primary/20 group-focus:outline-none transition-all duration-200 shadow-sm">
                    <svg
                        className="w-5 h-5 text-foreground"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                onClick={nextSlide}
                className="hidden md:flex absolute top-1/2 right-4 lg:right-12 -translate-y-1/2 z-30 items-center justify-center cursor-pointer group focus:outline-none transition-all duration-200"
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm group-hover:bg-white group-focus:ring-4 group-focus:ring-primary/20 group-focus:outline-none transition-all duration-200 shadow-sm">
                    <svg
                        className="w-5 h-5 text-foreground"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>

            {/* Indicator dots */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 lg:left-3/4 -translate-x-1/2 z-30 flex gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/75 w-2"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

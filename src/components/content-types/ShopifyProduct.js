"use client"

import React, { useState, useEffect } from "react"
import { DotCMSEditableText } from "@dotcms/react"

export default function ShopifyProduct(props) {
    const { 
        title, 
        shopifyProduct,
        alternateImage
    } = props

    const [productData, setProductData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch product data from dotCMS Shopify REST API
    useEffect(() => {
        if (!shopifyProduct) {
            setLoading(false)
            return
        }

        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError(null)

                const dotcmsUrl = process.env.NEXT_PUBLIC_DOTCMS_HOST
                const authToken = process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN

                if (!dotcmsUrl || !authToken) {
                    throw new Error('dotCMS configuration missing. Please set NEXT_PUBLIC_DOTCMS_HOST and NEXT_PUBLIC_DOTCMS_AUTH_TOKEN')
                }

                // Normalize URL to avoid double slashes
                const baseUrl = dotcmsUrl.replace(/\/$/, '')
                
                // Call dotCMS Shopify REST API directly using the env variable
                const apiUrl = `${baseUrl}/api/v1/shopify/product/?id=${encodeURIComponent(shopifyProduct)}`
                
                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    cache: 'no-store'
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                
                // Extract product from response
                // Response structure: { data: { product: { ... } } }
                const product = data?.data?.product || data?.product
                
                if (product) {
                    setProductData(product)
                } else {
                    throw new Error('Product data not found in API response')
                }
            } catch (err) {
                console.error('Error fetching Shopify product:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [shopifyProduct])

    if (loading) {
        return (
            <section className="w-full py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Loading product...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="w-full py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-12 text-red-600">
                        <p>Error loading product: {error}</p>
                    </div>
                </div>
            </section>
        )
    }

    if (!productData) {
        return null
    }

    return (
        <section className="w-full py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <ShopifyProductCard product={productData} title={title} alternateImage={alternateImage} />
                </div>
            </div>
        </section>
    )
}

function ShopifyProductCard({ product, title, alternateImage }) {
    // Handle Shopify GraphQL product structure
    const productTitle = product.title || product.name || title
    const productHandle = product.handle
    const productUrl = product.url || (productHandle ? `/products/${productHandle}` : '#')
    const productDescription = product.description
    
    // Shopify GraphQL image structure: { url, altText, width, height }
    const productImage = product.featuredImage || 
                        product.images?.edges?.[0]?.node || 
                        product.images?.[0] ||
                        product.image
    
    // Shopify GraphQL price structure: priceRange { minVariantPrice { amount, currencyCode } }
    const priceRange = product.priceRange
    const minPrice = priceRange?.minVariantPrice?.amount
    const currencyCode = priceRange?.minVariantPrice?.currencyCode || 'USD'
    
    // Also check for compareAtPriceRange (for sale prices)
    const compareAtPriceRange = product.compareAtPriceRange
    const compareAtMinPrice = compareAtPriceRange?.minVariantPrice?.amount
    
    // Use min price as primary, compareAt min as sale price
    const productPrice = minPrice
    const productComparePrice = compareAtMinPrice
    
    // Format price - Shopify GraphQL prices are typically as decimal strings
    const formatPrice = (price, currency = currencyCode) => {
        if (!price) return null
        const numPrice = typeof price === 'string' ? parseFloat(price) : price
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(numPrice)
    }

    const displayPrice = formatPrice(productPrice)
    const displayComparePrice = formatPrice(productComparePrice)
    const hasDiscount = displayComparePrice && displayPrice && 
                       parseFloat(productComparePrice) > parseFloat(productPrice)

    // Get image source - prioritize alternateImage if present, otherwise use Shopify product image
    // alternateImage might be a string path or an object with idPath/identifier
    const alternateImageSrc = alternateImage?.idPath || 
                              alternateImage?.identifier || 
                              alternateImage
    
    const productImageSrc = productImage?.url || 
                           productImage?.src || 
                           productImage?.idPath || 
                           productImage?.identifier ||
                           productImage
    
    // Use alternateImage if present, otherwise fall back to product image
    const imageSrc = alternateImageSrc || productImageSrc

    return (
        <div className="relative">
            <div className="flex size-full flex-col gap-2 p-3 bg-[#fdfdfb] rounded-2xl border group transition-all duration-200 hover:shadow-lg cursor-pointer mb-6">
                {/* Product Image - from Shopify CDN, use regular img tag */}
                {imageSrc && (
                    <div className="w-full aspect-square rounded-lg overflow-hidden shrink-0">
                        <img
                            src={imageSrc}
                            alt={productTitle || "Product"}
                            className="size-full object-contain"
                        />
                    </div>
                )}

                {/* Product Info */}
                <div className="flex w-full flex-col gap-1 grow p-3">
                    <span className="font-bold text-foreground text-lg group-hover:text-[#cce600] transition-colors duration-200">
                        {productTitle}
                    </span>

                    {/* Product Description */}
                    {productDescription && (
                        <div className="text-sm text-muted-foreground line-clamp-3">
                            {productDescription.replace(/<[^>]*>/g, '')}
                        </div>
                    )}

                    {/* Price section */}
                    <div className="flex items-center gap-2 mt-auto">
                        {hasDiscount ? (
                            <div className="flex items-center gap-2">
                                <span className="text-md font-semibold text-red-600">
                                    {displayPrice}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    {displayComparePrice}
                                </span>
                                {productPrice && productComparePrice && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                        {Math.round((1 - parseFloat(productPrice) / parseFloat(productComparePrice)) * 100)}%
                                        OFF
                                    </span>
                                )}
                            </div>
                        ) : (
                            displayPrice && (
                                <span className="text-md font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                                    {displayPrice}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


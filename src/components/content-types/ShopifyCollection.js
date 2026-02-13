"use client"

import React, { useState, useEffect } from "react"
import { DotCMSEditableText } from "@dotcms/react"

export default function ShopifyCollection(props) {
    const { 
        title, 
        shopifyCollection
    } = props

    const [collectionData, setCollectionData] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Parse the shopifyCollection JSON string to get collection ID
    let collectionConfig = null
    if (shopifyCollection) {
        try {
            collectionConfig = typeof shopifyCollection === 'string' 
                ? JSON.parse(shopifyCollection) 
                : shopifyCollection
        } catch (error) {
            console.error('Error parsing shopifyCollection:', error)
        }
    }

    // Fetch collection data from dotCMS Shopify REST API
    useEffect(() => {
        if (!collectionConfig?.id) {
            setLoading(false)
            return
        }

        const fetchCollection = async () => {
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
                const apiUrl = `${baseUrl}/api/v1/shopify/collection/?id=${encodeURIComponent(collectionConfig.id)}`
                
                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    cache: 'no-store'
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch collection: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                
                // Extract collection and products from response
                // Response structure: { data: { collection: { title, description, products: { edges: [...] } } } }
                const collection = data?.data?.collection || data?.collection
                
                if (collection) {
                    setCollectionData(collection)
                    
                    // Extract products from GraphQL edges structure
                    const productsEdges = collection.products?.edges || []
                    let extractedProducts = []
                    
                    if (productsEdges.length > 0 && productsEdges[0]?.node) {
                        // GraphQL edges structure
                        extractedProducts = productsEdges.map(edge => edge.node)
                    } else {
                        // Already extracted or different structure
                        extractedProducts = productsEdges
                    }
                    
                    // Apply limit if specified
                    const limit = collectionConfig.limit || extractedProducts.length
                    setProducts(extractedProducts.slice(0, limit))
                } else {
                    throw new Error('Collection data not found in API response')
                }
            } catch (err) {
                console.error('Error fetching Shopify collection:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCollection()
    }, [collectionConfig?.id, collectionConfig?.limit])

    // Get collection title and description
    const collectionTitle = collectionData?.title || title
    const collectionDescription = collectionData?.description

    if (loading) {
        return (
            <section className="w-full py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Loading collection...</p>
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
                        <p>Error loading collection: {error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Collection Header */}
                <div className="mb-8">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                        <DotCMSEditableText
                            contentlet={props}
                            fieldName="title"
                        />
                    </h1>

                    {/* Collection Description from Shopify */}
                    {collectionDescription && (
                        <p className="text-muted-foreground text-lg mb-4">
                            {collectionDescription}
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ShopifyProductCard 
                                key={product.id || product.identifier || product.handle} 
                                product={product} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No products found in this collection.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

function ShopifyProductCard({ product }) {
    // Handle Shopify GraphQL product structure
    const productTitle = product.title || product.name
    const productHandle = product.handle
    const productUrl = product.url || (productHandle ? `/products/${productHandle}` : '#')
    
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

    // Get image source - Shopify GraphQL images have url property
    const imageSrc = productImage?.url || 
                     productImage?.src || 
                     productImage?.idPath || 
                     productImage?.identifier ||
                     productImage

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


import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const collectionId = searchParams.get('id')

        if (!collectionId) {
            return NextResponse.json(
                { error: 'Collection ID is required' },
                { status: 400 }
            )
        }

        const dotcmsUrl = process.env.NEXT_PUBLIC_DOTCMS_HOST
        const authToken = process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN

        if (!dotcmsUrl || !authToken) {
            return NextResponse.json(
                { error: 'dotCMS configuration missing' },
                { status: 500 }
            )
        }

        // Proxy the request to dotCMS Shopify REST API
        const apiUrl = `${dotcmsUrl}/api/v1/shopify/collection/?id=${encodeURIComponent(collectionId)}`
        
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json(
                { error: `Failed to fetch collection: ${response.status} ${response.statusText}`, details: errorText },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error proxying Shopify collection request:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}


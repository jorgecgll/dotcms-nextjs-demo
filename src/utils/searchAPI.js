/**
 * Search content using dotAI search API
 */
export async function searchContent(query, indexName = "Blog", limit = 10) {
    if (!query.trim()) throw new Error("Search query is required");
    if (!process.env.NEXT_PUBLIC_DOTCMS_HOST || !process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN) {
        throw new Error("dotCMS configuration is missing");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}api/v1/ai/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            prompt: query.trim(),
            indexName,
            searchLimit: limit,
            searchOffset: 0,
            threshold: 0.25,
            stream: false
        })
    });

    if (!response.ok) throw new Error(`Search failed: ${response.status}`);

    const data = await response.json();
    
    // Log the full response to see what we're working with
    console.log('Full dotAI API response:', JSON.stringify(data, null, 2));
    
    return data.dotCMSResults
        ?.sort((a, b) => (a.matches?.[0]?.distance || 0) - (b.matches?.[0]?.distance || 0))
        ?.map((result, index) => {
        console.log(`Result ${index}:`, JSON.stringify(result, null, 2));
        const contentlet = result.contentlet || result;
        console.log(`Contentlet ${index}:`, JSON.stringify(contentlet, null, 2));
        return {
            title: contentlet.title || contentlet.urlTitle || 'Untitled',
            excerpt: contentlet.teaser || contentlet.blogContent || 'No description available',
            url: contentlet.urlMap || contentlet.urlTitle || '#',
            identifier: contentlet.identifier,
            modDate: contentlet.modDate,
            score: result.matches?.[0]?.distance || 0,
            matches: result.matches || [],
            contentType: contentlet.contentType || 'Unknown'
        };
    }) || [];
}
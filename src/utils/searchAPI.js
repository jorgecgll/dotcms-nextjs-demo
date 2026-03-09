/**
 * Search content using dotAI search API
 */
export async function searchContent(query, indexName = "default", limit = 10) {
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
    
    return data.dotCMSResults
        ?.sort((a, b) => (a.matches?.[0]?.distance || 0) - (b.matches?.[0]?.distance || 0))
        ?.map((result, index) => {
        const contentlet = result.contentlet || result;
        return {
            title: contentlet.title || contentlet.urlTitle || 'Untitled',
            excerpt: contentlet.teaser || contentlet.body || 'No description available',
            url: contentlet.urlMap || contentlet.urlTitle || '#',
            identifier: contentlet.identifier,
            modDate: contentlet.modDate,
            score: result.matches?.[0]?.distance || 0,
            matches: result.matches || [],
            contentType: contentlet.contentType || 'Unknown'
        };
    }) || [];
}

/**
 * Generate AI response using dotAI completions API
 * @param {string} prompt - The user's question/prompt
 * @returns {Promise<string>} AI response text
 */
export async function generateAIResponse(prompt) {
    if (!prompt.trim()) throw new Error("Prompt is required");
    if (!process.env.NEXT_PUBLIC_DOTCMS_HOST || !process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN) {
        throw new Error("dotCMS configuration is missing");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}api/v1/ai/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                prompt: prompt.trim(),
                searchLimit: 20,
                searchOffset: 0,
                responseLengthTokens: 500,
                language: 1,
                stream: false,
                fieldVar: "body",
                indexName: "default",
                threshold: 0.25,
                temperature: 0.7,
                model: "gpt-5",
                operator: "<=>",
            })
        });

        if (!response.ok) throw new Error(`AI generation failed: ${response.status}`);

        const data = await response.json();
        
        // Extract the AI response and sources
        const aiResponse = data.openAiResponse?.choices?.[0]?.message?.content || 'No response generated';
        const sources = data.dotCMSResults?.map((result, index) => {
            const contentlet = result.contentlet || result;
            return {
                title: contentlet.title || contentlet.urlTitle || 'Untitled',
                url: contentlet.urlMap || contentlet.urlTitle || '#',
                contentType: contentlet.contentType || 'Unknown',
                score: result.matches?.[0]?.distance || 0
            };
        }) || [];
        
        return { response: aiResponse, sources };
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error(`AI generation failed: ${error.message}`);
    }
}
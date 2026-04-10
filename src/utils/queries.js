const blogSearchLucene = (() => {
    const siteId = process.env.NEXT_PUBLIC_DOTCMS_SITE_ID?.trim()
    const base = '+contenttype:Blog +live:true'
    if (!siteId) return base
    return `${base} +conHost:${siteId}`
})()

export const blogQuery = `
    search(query: "${blogSearchLucene}", limit: 9) {
        title
        identifier
        ... on Blog {
            inode
            urlMap
            modDate
            urlTitle
            author {
                firstName
                lastName
                inode
            }
            image {
                title
                idPath
                width
                height
                focalPoint
            }
        }
    }
`;


export const navigationQuery = `
DotNavigation(uri: "/", depth: 2) {
    ...NavProps
    children {
        ...NavProps
    }
}
`;

export const fragmentNav = `
fragment NavProps on DotNavigation {
    code
    folder
    hash
    host
    href
    languageId
    order
    target
    title
    type
}
`;

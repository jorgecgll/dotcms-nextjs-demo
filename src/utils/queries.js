export const blogQuery = () => {
    const siteId = process.env.NEXT_PUBLIC_DOTCMS_SITE_ID || 'SYSTEM_HOST'
    return `
    search(query: "+contenttype:Blog +live:true +(conhost:${siteId} conhost:SYSTEM_HOST)", limit: 9) {
        title
        identifier
        ... on Blog {
            inode
            image {
                fileName
            }
            urlMap
            modDate
            urlTitle
            teaser
            author {
                firstName
                lastName
                inode
            }
        }
    }
`
}


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

export const blogQuery = `
    search(query: "+contenttype:Blog +live:true", limit: 9) {
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

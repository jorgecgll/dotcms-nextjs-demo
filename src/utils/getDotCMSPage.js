import { cache } from "react";
import { dotCMSClient } from "./dotCMSClient";
import {
    blogQuery,
    fragmentNav,
    navigationQuery,
} from "./queries";

export const getDotCMSPage = cache(async (path) => {
    try {
        const pageData = await dotCMSClient.page.get(path, {
            graphql: {
                page:`
                    containers {
                        containerContentlets {
                            contentlets {
                                _map
                                ... on BlogList {
                                    blogs {
                                        identifier
                                        title
                                        description
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
                                ... on BannerCarousel {
                                    banners {
                                        title
                                        caption
                                        link
                                        image {
                                            title
                                            idPath
                                            width
                                            height
                                            focalPoint
                                        }
                                        buttonText
                                    }
                                }
                            }
                        }
                    }
                    urlContentMap {
                        ... on Blog {
                            author {
                                firstName
                                lastName
                                title
                                inode
                            }
                            image {
                                idPath
                                title
                            }
                        }
                    }
                `,
                content: {
                    blogs: blogQuery,
                    navigation: navigationQuery,
                },
                fragments: [fragmentNav],
            }
        });
        
        return pageData;
    } catch (e) {
        console.error("ERROR FETCHING PAGE: ", e.message);

        return null;
    }
});

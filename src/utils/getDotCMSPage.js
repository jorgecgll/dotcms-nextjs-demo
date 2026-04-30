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
                page: `
                    containers {
                        containerContentlets {
                            contentlets {
                                _map
                                ... on FaqWidget {
                                    faq {
                                        question
                                        answer
                                    }
                                }
                                ... on BannerCarousel {
                                    banners {
                                        title
                                        caption
                                        link
                                        buttonText
                                        image {
                                            fileAsset {
                                                idPath
                                                versionPath
                                            }
                                        }
                                    }
                                }
                                ... on Video {
                                    title
                                    asset {
                                        idPath
                                        versionPath
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
                                fileAsset {
                                    idPath
                                    versionPath
                                }
                            }
                        }
                    }
                `,
                content: {
                    blogs: blogQuery(),
                    navigation: navigationQuery,
                },
                fragments: [fragmentNav],
            },
            depth: 3,
        });
        return pageData;
    } catch (e) {
        console.error("ERROR FETCHING PAGE: ", e.message);

        return null;
    }
});

"use client";
import { useEditableDotCMSPage } from "@dotcms/react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/footer/Footer";

export function BlogListingPage(pageResponse) {
    const { content } = useEditableDotCMSPage(pageResponse);
    const navigation = content.navigation;
    const blogs = content.blogs || [];

    return (
        <div className="">
            <Header navItems={navigation?.children} />
            <main className="container m-auto py-12 md:py-16 lg:py-20">
                <section className="w-full">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-foreground text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
                            Blog
                        </h1>
                        <p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mb-8">
                            Expert financial insights and market analysis to help you make informed investment decisions and stay ahead in today&apos;s economy.
                        </p>
                    </div>
                </section>


                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.identifier} blog={blog} />
                        ))}
                    </div>

                    {blogs.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No blogs available.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer {...content} />
        </div>
    );
}


import BlogCard from "@/components/BlogCard";

function getBlogKey(blog, index) {
    return (
        blog?.identifier ||
        blog?.inode ||
        blog?._map?.identifier ||
        blog?._map?.inode ||
        blog?.urlMap ||
        `blog-${index}`
    );
}

export default function BlogList({ blogs = [] }) {
    const blogItems = Array.isArray(blogs) ? blogs.filter(Boolean) : [];

    if (blogItems.length === 0) {
        return (
            <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                    No blogs available.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogItems.map((blog, index) => (
                <BlogCard key={getBlogKey(blog, index)} blog={blog} />
            ))}
        </div>
    );
}

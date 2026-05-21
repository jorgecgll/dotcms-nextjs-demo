import BlogCard from "@/components/BlogCard";

export default function BlogList({ blogs = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <BlogCard key={blog.inode ?? blog.identifier} blog={blog} />
            ))}

            {blogs.length === 0 && (
                <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">
                        No blogs available.
                    </p>
                </div>
            )}
        </div>
    );
}

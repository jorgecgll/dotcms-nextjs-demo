import { useIsEditMode } from "@/hooks/isEditMode";
import { editContentlet } from "@dotcms/uve";
import Image from "next/image";
import Link from "next/link";

const dateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default function BlogCard({ blog }) {
    const { title, image, urlMap, inode, modDate, urlTitle, teaser, author } = blog;
    const authorData = author && (Array.isArray(author) ? author[0] : author);
    const authorName = authorData?.firstName && authorData?.lastName 
        ? `${authorData.firstName} ${authorData.lastName}` 
        : null;

    const isEditMode = useIsEditMode();

    return (
        <div className="flex size-full flex-col gap-2 p-3 bg-[#fdfdfb] rounded-2xl border group transition-all duration-200 hover:shadow-lg cursor-pointer relative">
            {isEditMode && (
                <button
                    onClick={() => editContentlet(blog)}
                    className="absolute top-2 right-2 z-10 bg-blue-500 text-white rounded-md py-2 px-4 shadow-md hover:bg-blue-600"
                >
                    Edit
                </button>
            )}

            <Link href={urlMap} className="w-full aspect-video rounded-lg overflow-hidden shrink-0 block">
                {image ? (
                    <picture className="relative block w-full h-full object-cover">
                        <Image
                            alt={urlTitle || title}
                            title={title}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover"
                            src={inode}
                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px' }}
                            fill={true}
                        />
                    </picture>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                    </div>
                )}
            </Link>

            <div className="flex w-full flex-col gap-4 grow p-3">
                <div className="text-md w-full flex flex-col gap-4">
                    <a href={urlMap} className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
                        {title}
                    </a>
                    {teaser && (
                        <div className="line-clamp-4">
                            <p className="text-muted-foreground">
                                {teaser}
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                    <time className="text-sm text-muted-foreground">
                        {new Date(modDate).toLocaleDateString(
                            "en-US",
                            dateFormatOptions,
                        )}
                    </time>
                    {authorName && (
                        <div className="text-sm text-muted-foreground">
                            {authorName}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

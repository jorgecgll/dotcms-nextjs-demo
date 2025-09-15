function WebPageContent({ title, body }) {
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-4">
                <div 
                    className="max-w-none
                        [&_p]:text-muted-foreground [&_p]:text-sm [&_p]:md:text-base [&_p]:lg:text-base [&_p]:font-normal [&_p]:leading-relaxed [&_p]:mb-4
                        [&_h1]:text-foreground [&_h1]:text-lg [&_h1]:md:text-2xl [&_h1]:lg:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:mb-6 [&_h1]:mt-8
                        [&_h2]:text-foreground [&_h2]:text-lg [&_h2]:md:text-2xl [&_h2]:lg:text-4xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:mb-6 [&_h2]:mt-8
                        [&_h3]:text-foreground [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:lg:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:mb-4 [&_h3]:mt-6
                        [&_h4]:text-foreground [&_h4]:text-base [&_h4]:md:text-base [&_h4]:lg:text-lg [&_h4]:font-semibold [&_h4]:leading-tight [&_h4]:mb-3 [&_h4]:mt-5
                        [&_h5]:text-foreground [&_h5]:text-sm [&_h5]:md:text-base [&_h5]:lg:text-base [&_h5]:font-semibold [&_h5]:leading-tight [&_h5]:mb-3 [&_h5]:mt-4
                        [&_h6]:text-foreground [&_h6]:text-sm [&_h6]:md:text-sm [&_h6]:lg:text-base [&_h6]:font-semibold [&_h6]:leading-tight [&_h6]:mb-2 [&_h6]:mt-4
                        [&_ul]:mb-4 [&_ul]:mt-4 [&_ol]:mb-4 [&_ol]:mt-4
                        [&_li]:text-muted-foreground [&_li]:text-sm [&_li]:md:text-base [&_li]:lg:text-base [&_li]:font-normal [&_li]:leading-relaxed [&_li]:mb-2
                        [&_ul]:pl-6 [&_ol]:pl-6 [&_ul]:list-disc [&_ol]:list-decimal
                        [&_a]:text-primary [&_a]:hover:text-primary-dark [&_a]:transition-colors [&_a]:duration-200 [&_a]:font-medium [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary-dark
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_em]:text-muted-foreground [&_em]:italic
                        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-secondary/20 [&_blockquote]:rounded-r-lg
                        [&_blockquote_p]:text-muted-foreground [&_blockquote_p]:italic [&_blockquote_p]:mb-0
                        [&_code]:bg-secondary [&_code]:text-foreground [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                        [&_pre]:bg-secondary [&_pre]:text-foreground [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6
                        [&_pre_code]:bg-transparent [&_pre_code]:p-0
                        [&_img]:rounded-xl [&_img]:my-8 [&_img]:w-full [&_img]:h-auto [&_img]:object-cover [&_img]:shadow-sm
                        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                        [&_th]:border [&_th]:border-border [&_th]:bg-secondary [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
                        [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2 [&_td]:text-muted-foreground
                        [&_hr]:border-border [&_hr]:my-8"
                    dangerouslySetInnerHTML={{ __html: body }} 
                />
            </div>
        </div>
    );
}

export default WebPageContent;

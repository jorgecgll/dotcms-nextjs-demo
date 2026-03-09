import { CustomNoComponent } from "./Empty";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import ImageComponent from "./Image";
import VtlInclude from "./VtlInclude";
import Video from "./Video";
import WebPageContent from "./WebPageContent";
import BlogList from "../BlogList";

export const pageComponents = {
    Banner: Banner,
    BannerCarousel: BannerCarousel,
    CustomNoComponent: CustomNoComponent,
    Image: ImageComponent,
    VtlInclude: VtlInclude,
    Video: Video,
    webPageContent: WebPageContent,
    BlogList: (props) => (
        <section className="w-full py-4 mb-16">
            <div className="max-w-6xl mx-auto px-4">
                {props.title && (
                    <h2 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
                        {props.title}
                    </h2>
                )}
                <BlogList {...props} />
            </div>
        </section>
    ),
    webPageContent: WebPageContent,
};

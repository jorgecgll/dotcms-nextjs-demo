import { CustomNoComponent } from "./Empty";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import CalendarEvent from "./CalendarEvent";
import CategoryFilter from "./CategoryFilter";
import SimpleWidget from "./SimpleWidget";
import ImageComponent from "./Image";
import PageForm from "./PageForm";
import Product from "./Product";
import StoreProductList from "./StoreProductList";
import VtlInclude from "./VtlInclude";
import WebPageContent from "./WebPageContent";
import Card from "./Card";
import FaqWidget from "./FaqWidget";
import ShopifyCollection from "./ShopifyCollection";
import ShopifyProduct from "./ShopifyProduct";
import Video from "./Video";

export const pageComponents = {
    Banner: Banner,
    BannerCarousel: BannerCarousel,
    FaqWidget: FaqWidget,
    calendarEvent: CalendarEvent,
    CallToAction: Card,
    CategoryFilter: CategoryFilter,
    CustomNoComponent: CustomNoComponent,
    Image: ImageComponent,
    PageForm: PageForm,
    Product: Product,
    SimpleWidget: SimpleWidget,
    StoreProductList: StoreProductList,
    VtlInclude: VtlInclude,
    Video: Video,
    webPageContent: WebPageContent,
    dotShopifyCollection: ShopifyCollection,
    dotShopifyProduct: ShopifyProduct,
};

import Image from 'next/image';

const BentoCard = ({ title, description, image, inode, ctaText = "Learn more" }) => (
  <div className="flex size-full flex-col gap-2 p-3 bg-[#fdfdfb] rounded-2xl border group transition-all duration-200 hover:shadow-lg cursor-pointer mb-6 min-h-110">
    {/* Image section */}
    <div className="w-full aspect-video rounded-lg overflow-hidden shrink-0">
      {image ? (
        <picture className="relative block w-full h-full object-cover">
          <Image 
            alt={title}
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
        </div>
      )}
    </div>
    
    {/* Content section */}
    <div className="flex w-full flex-col gap-4 grow p-3">
      <div className="text-md w-full flex flex-col gap-4">
        <span className="font-bold text-foreground text-lg group-hover:text-[#cce600] transition-colors duration-200">
          {title}
        </span>
        <div className="line-clamp-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to action section */}
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-md font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {ctaText}
        </span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          className="text-muted-foreground group-hover:text-foreground transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  </div>
)

export default BentoCard;

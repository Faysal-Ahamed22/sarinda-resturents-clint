import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/home/01.jpg';
import img2 from '../../assets/home/02.jpg';
import img3 from '../../assets/home/03.png';
import img4 from '../../assets/home/04.jpg';
import img5 from '../../assets/home/05.png';
import img6 from '../../assets/home/06.png';


const Banner = () => {
    return (
        <Carousel autoPlay interval={1900} infiniteLoop showThumbs={false} showStatus={false} emulateTouch swipeable>
            <div>
                <img src={img1} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 1" />
            </div>
            <div>
                 <img src={img2} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 2" />
            </div>
            <div>
                 <img src={img3} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 3" />
            </div>
            <div>
                <img src={img4} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 4" />
            </div>
            <div>
                 <img src={img5} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 5" />
            </div>
            <div>
                 <img src={img6} className="h-[200px] w-full object-cover sm:h-[300px] md:h-[380px] lg:h-[500px]" alt="Banner 6" />
            </div>
        </Carousel>
    );
};

export default Banner;

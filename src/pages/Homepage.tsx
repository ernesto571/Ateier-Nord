import CTA from "../components/Home/CTA";
import Category from "../components/Home/Category";
import Faq from "../components/Home/Faq";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import LimitedTimeOffer from "../components/Home/LimitedTimeOffer";
import Review from "../components/Home/Review";
import Story from "../components/Home/Story";
import TrustSlip from "../components/Home/TrustSlip";
import PopularPicks from "../components/Home/popularPicks";

export default function HomePage (){

    return (
        <main>
            <Hero />
            <Category />
            <LimitedTimeOffer />
            <PopularPicks />
            <Story />
            <Review />
            <Faq />
            <CTA />
            <TrustSlip />
            <Footer />
        </main>
    )
}
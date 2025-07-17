import HomePageSlider from "../components/HomePageSlider"
import ListProducts from "../components/ListProducts"
import FeaturedProduct from "../components/FeaturedProduct"


const Home = () => { 
    return ( 
        <div className="home">
            <HomePageSlider />
            <ListProducts />
            <FeaturedProduct />
        </div>
    )
}

export default Home
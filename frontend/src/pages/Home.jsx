import HomePageSlider from "../components/HomePageSlider"
import ListProducts from "../components/ListProducts"


const Home = () => { 
    return ( 
        <div className="home">
            <HomePageSlider />
            <ListProducts />
        </div>
    )
}

export default Home
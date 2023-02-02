import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import { MapComponent } from "../../../components/mapComponent/mapComponent";
import SearchAside from "../../../components/search/searchAside";

export const Map = () => {
    return (
        <>
            <Header />
                <div className="container-field container-primary">
                <SearchAside />                
                <MapComponent />
                </div>   
            <Footer />
        </>
    );
}

export default Map;
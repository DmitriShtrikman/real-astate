import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import SearchAside from "../../../components/search/searchAside";
import SearchResult from "../../../components/search/searchResult";


export const Sale = () => {
    return (
        <>
            <Header />
            <div className="container-field container-primary">
                <SearchAside />
                <SearchResult />
             </div>     
            <Footer />
        </>
    );
}

export default Sale;
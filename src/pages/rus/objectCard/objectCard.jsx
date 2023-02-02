import CardComponent from "../../../components/cards/cardComponent";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";



export const ObjectCard = () => {
    return (
        <>
            <Header />
                <div className="container-field container-primary">
                    <main className="main card-component-main">
                        <CardComponent />
                    </main>
                </div>   
            <Footer />
        </>
    );
}

export default ObjectCard;
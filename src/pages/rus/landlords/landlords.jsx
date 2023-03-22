import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";

export const Landlords = ({component}) => {
    return (
        <>
            <Header />
            {component}
            <Footer />
        </>
    );
}

export default Landlords;
import ContactsAside from "../../../components/contacts/contactsAside";
import ContactsMain from "../../../components/contacts/contactsMain";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";

export const Contacts = () => {
    return (
        
        <>
            <Header />
            <div className="container-field container-primary contacts-wrp">
                <ContactsAside />
                <ContactsMain />
            </div>  
            <Footer />
        </>
    );
}

export default Contacts;
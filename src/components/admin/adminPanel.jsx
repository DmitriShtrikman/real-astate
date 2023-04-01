import PageNotFoundNoHeader from "../../pages/rus/404/PageNotFoundNoHeaderNoFooter";
import { checkadmin } from "../../server/googleFirebase";
import AdminSearchAside from "./adminSearchAside";
import AdminSearchResult from "./adminSearchResult";

export const AdminPanel = ({component}) => {
    const isAdmin = checkadmin();


// TODO Delete before prod
// return (
//     <>
//     <div className="container-field container-primary">
//         <AdminSearchAside />
//         <AdminSearchResult component={component}/>
//     </div>
//     </>
// )   
// - ** - //

    if(isAdmin) {
        return (
            <>
            <div className="container-field container-primary">
                <AdminSearchAside />
                <AdminSearchResult component={component}/>
            </div>
            </>
        )   
    } 
    return <PageNotFoundNoHeader />
}

export default AdminPanel;
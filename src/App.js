import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contacts from './pages/rus/contacts/contacts';
import Landlords from './pages/rus/landlords/landlords';
import Main from './pages/rus/main/main';
import NewBuildings from './pages/rus/newBuildings/newBuildings';
import Rent from './pages/rus/rent/rent';
import Sale from './pages/rus/sale/sale';
import Map from './pages/rus/map/map';
import PersonalData from './pages/rus/personalData/personalData';
import ObjectCard from './pages/rus/objectCard/objectCard';
import LogIn from './components/authtorisation/logIn';
import SignIn from './components/authtorisation/signIn';
import SignUp from './components/authtorisation/signUp';
import PageNotFound from './pages/rus/404/PageNotFound';
import { useEffect } from 'react';
import { onValue } from 'firebase/database';
import { objectsDataBase, regionsDataBase, usersDataBase } from './store/actions/actions';
import { useDispatch } from 'react-redux';
import { dataUsersRef, dataRef, regionDataRef } from './server/googleFirebase';
import { FormSent } from './components/sendForm/formSent';
import AdminSearchResult from './components/admin/adminSearchResult';
import AdminPanel from './components/admin/adminPanel';
import AdminUsers from './components/admin/adminUsers';
import AdminRegions from './components/admin/adminRegions';
import AdminDb from './components/admin/adminDb';
import AdminObject from './components/admin/adminObject';
import AdminCardComponent from './components/cards/adminCardComponent';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const newData = Object.entries(data).map((item) => ({
              id: item[0],
              ...item[1]
          }))         
          dispatch(objectsDataBase(newData));  
        }            
    });  
    onValue(dataUsersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const newData = Object.entries(data).map((item) => ({
            id: item[0],
            ...item[1]
        }));
        dispatch(usersDataBase(newData));        
      }
    }); 
    onValue(regionDataRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const newData = Object.entries(data).map((item) => ({
            id: item[0],
            ...item[1]
        }));
        dispatch(regionsDataBase(newData));     
      }
    });       
  }, []);


  return (
    <div className="App">
      <Routes>        
        <Route path="*" element={<PageNotFound />} />
        <Route exact path="/rent" element={<Rent />} />
        <Route exact path="/rent/:param" element={<Rent />} />
        <Route exact path="/sale" element={<Sale />} />
        <Route exact path="/sale/:param" element={<Sale />} />
        <Route exact path="/new" element={<NewBuildings />} />
        <Route exact path="/new/:param" element={<NewBuildings />} />
        <Route path="/card/:id" element={<ObjectCard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/landlords" element={<Landlords component={<LogIn />}/>} />
        <Route path="/landlords/sent" element={<Landlords component={<FormSent />}/>} />
        <Route path="/landlords/signin" element={<Landlords component={<SignIn />}/>} />
        <Route path="/landlords/signup" element={<Landlords component={<SignUp />}/>} />
        <Route path="/landlords/admin/users" element={<Landlords component={<AdminPanel component={<AdminUsers/>}/>}/>} />
        <Route path="/landlords/admin/db" element={<Landlords component={<AdminPanel component={<AdminDb />}/>}/>} />
        <Route path="/landlords/admin/regions" element={<Landlords component={<AdminPanel component={<AdminRegions />}/>}/>} />
        <Route path="/landlords/admin/createobject" element={<Landlords component={<AdminPanel component={<AdminObject/>}/>}/>} />
        <Route path="/landlords/admin/users/card/:id" element={<Landlords component={<AdminPanel component={<AdminCardComponent dbname='fulldb'/>}/>}/>} />
        <Route path="/landlords/admin/db/card/:id" element={<Landlords component={<AdminPanel component={<AdminCardComponent dbname='deployDb'/>}/>}/>} />
        <Route path="/protection-personal-data" element={<PersonalData />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;

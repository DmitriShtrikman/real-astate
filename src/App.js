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
import { objectsDataBase, regionsDataBase } from './store/actions/actions';
import { useDispatch } from 'react-redux';
import { dataRef, regionDataRef } from './server/googleFirebase';
import { FormSent } from './components/sendForm/formSent';

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
        <Route path="/protection-personal-data" element={<PersonalData />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;

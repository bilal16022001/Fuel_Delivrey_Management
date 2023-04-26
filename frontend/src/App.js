import logo from './logo.svg';
import './App.css';
import Home from './Componenets/Home';
import NavBar from './Componenets/NavBar';
import {BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import AdminLogin from './Componenets/Admin/AdminLogin';
import Contact from './Componenets/Contact';
import OwnerStation from './Componenets/Fuel_Station_owner/OwnerStation';
import UserLogin from './Componenets/User/UserLogin';
import RegisterOwner from './Componenets/Fuel_Station_owner/RegisterOwner';
import Dashboard from './Componenets/Admin/Dashboard';
import State from './Componenets/Admin/State';
import City from './Componenets/Admin/City';
import Fuel from './Componenets/Admin/Fuel';
import Page_contact from './Componenets/Admin/Page_contact';
import Page_About from './Componenets/Admin/Page_About';
import Reports from './Componenets/Admin/Reports';
import Inquiry from './Componenets/Admin/Inquiry';
import Search from './Componenets/Admin/Search';
import Users from './Componenets/Admin/Users';
import Fuel_station_owner from './Componenets/Admin/Fuel_station_owner';
import DashboardOwner from './Componenets/Fuel_Station_owner/DashboardOwner';
import ProfileAdmin from './Componenets/Admin/PofileAdmin'
import FuelStation from './Componenets/Fuel_Station_owner/FuelStation';
import SearchOwner from './Componenets/Fuel_Station_owner/SearchOwner';
import ReportsOwner from './Componenets/Fuel_Station_owner/ReportsOwner';
import OrderFuel from './Componenets/Fuel_Station_owner/OrderFuel';
import DashboardUser from './Componenets/User/DashboardUser';
import OrderFuelUser from './Componenets/User/OrderFuelUser';
import OrderStatus from './Componenets/User/OrderStatus';
import SearchUser from './Componenets/User/SearchUser';
import OrderDetail from './Componenets/User/OrderDetail';
import ForderDetail from './Componenets/Fuel_Station_owner/ForderDetail';
import All_Orders from './Componenets/Fuel_Station_owner/All_Orders';
import DetailStOwner from './Componenets/Admin/DetailStOwner';
import UserOrders from './Componenets/Admin/UserOrders';
import OrderDetailA from './Componenets/Admin/OrderDetailA';
import DetailStationOwner from './Componenets/Admin/DetailStationOwner';
import Confirmed_Order from './Componenets/Fuel_Station_owner/Confirmed_Order';
import OnTheWay_Order from './Componenets/Fuel_Station_owner/OnTheWay_Order';
import Delivred_Order from './Componenets/Fuel_Station_owner/Delivred_Order';
import Cancelled_Order from './Componenets/Fuel_Station_owner/Cancelled_Order';
import New_Order from './Componenets/Fuel_Station_owner/New_Order';
import ProfileOwner from './Componenets/Fuel_Station_owner/ProfileOwner';
import ProfileUser from './Componenets/User/ProfileUser';
import OrderStatusDetail from './Componenets/User/OrderStatusDetail';
import RegisterUser from './Componenets/User/RegisterUser';

function App() {
  return (
    <Router>
    <div className="">
      <Routes>

         {/* Module Admin */}

         <Route path='/' element={<Home/>} />
         {/* <Route path='/:arg' element={<Home/>} /> */}
         <Route path='/Contact' element={<Contact/>} />
         <Route path='/Admin' element={<AdminLogin/>} />
         <Route path='/Dashboard' element={<Dashboard/>} />
         <Route path='/State' element={<State/>} />
         <Route path='/City' element={<City/>} />
         <Route path='/Fuel' element={<Fuel/>} />
         <Route path='/Page_Contact' element={<Page_contact/>} />
         <Route path='/Page_About' element={<Page_About/>} />
         <Route path='/Reports' element={<Reports/>} />
         <Route path='/Inquiry' element={<Inquiry/>} />
         <Route path='/Search' element={<Search/>} />
         <Route path='/Users' element={<Users/>} />
         <Route path='/Station_Owner' element={<Fuel_station_owner/>} />
         <Route path='/Station_Owner/:id' element={<DetailStationOwner/>} />
         <Route path='/PofileAdmin' element={<ProfileAdmin/>} />
         <Route path='/UserOrders/:id' element={<UserOrders/>} />
         <Route path='/OrderDetail/:id' element={<OrderDetailA/>} />

         {/* Module Fuel Station Owner */}

         <Route path='/FuelOwner/Dashboard' element={<DashboardOwner/>} />
         <Route path='/FuelOwner/FuelStation' element={<FuelStation/>} />
         <Route path='/FuelOwner/Search' element={<SearchOwner/>} />
         <Route path='/FuelOwner/Reports' element={<ReportsOwner/>} />
         <Route path='/FuelOwner/All_Orders' element={<All_Orders/>} />
         <Route path='/FuelOwner/New_Order' element={<New_Order/>} />
         <Route path='/FuelOwner/Confirmed_Order' element={<Confirmed_Order/>} />
         <Route path='/FuelOwner/OnTheWay_Order' element={<OnTheWay_Order/>} />
         <Route path='/FuelOwner/Delivred__Order' element={<Delivred_Order/>} />
         <Route path='/FuelOwner/Cancelled_Order' element={<Cancelled_Order/>} />
         <Route path='/FuelOwner/ForderDetail/:id' element={<ForderDetail/>} />
         <Route path='/FuelOwner/ProfileOwner' element={<ProfileOwner/>} />
         <Route path='/OwnerStation' element={<OwnerStation/>} />
         <Route path='/RegisterOwner' element={<RegisterOwner/>} />

          {/* Module User  */}
          
          <Route path='/User' element={<UserLogin/>} />
          <Route path='/User/Dashboard' element={<DashboardUser/>} />
          <Route path='/User/OrderFuel' element={<OrderFuelUser/>} />
          <Route path='/User/OrderStatus' element={<OrderStatus/>} />
          <Route path='/User/Search' element={<SearchUser/>} />
          <Route path='/User/OrderDetail/:id' element={<OrderDetail/>} />
          <Route path='/User/ProfileUser' element={<ProfileUser/>} />
          <Route path='/User/OrderStatus/:id' element={<OrderStatusDetail/>} />
          <Route path='/RegisterUser' element={<RegisterUser/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

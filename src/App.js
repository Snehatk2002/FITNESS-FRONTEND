import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import TrainerProfile from './components/TrainerProfile';
import AddTrainers from './components/AddTrainers';
import ViewTrainers from './components/ViewTrainers';
import UserTrainerProfile from './components/UserTrainerProfile';
import Store from './components/Store';
import ViewStore from './components/ViewStore';
import AddMachine from './components/AddMachine';
import ViewMachines from './components/ViewMachines';
import WorkoutScheduling from './components/WorkoutScheduling';
import ViewWorkout from './components/ViewWorkout';
import Feedback from './components/Feedback';
import AdminFeedback from './components/AdminFeedback';
import CreateProfile from './components/CreateProfile';
import GetProfile from './components/GetProfile';
import AdminGetProfile from './components/AdminGetProfile';
import BMI from './components/BMI';
import About from './components/About';
import AdminTrainersManagement from './components/AdminTrainersManagement';
import AdminMachineManagement from './components/AdminMachineManagement';
import AdminAccessriesManagement from './components/AdminAccessoriesManagement';
import DeleteSchedule from './components/DeleteSchedule';
import CreateDietPlan from './components/CreateDietPlan';
import GetDietPlan from './components/GetDietPlan';
import AdminDietPlans from './components/AdminDietPlans.';
import PackagePayment from './components/PackagePayment';
import StorePayment from './components/StorePayment';
import Package from './components/Package';
import TrainerPage from './components/TrainerPage';
import GetTrainerProfile from './components/GetTrainerProfile';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/trainer' element={<TrainerProfile/>}/>
      <Route path='/addTrainers' element={<AddTrainers/>}/>
      <Route path='/viewTrainers' element={<ViewTrainers/>}/>
      <Route path='/userTrainerprofile' element={<UserTrainerProfile/>}/>
      <Route path='/store' element={<Store/>}/>
      <Route path='/viewstore' element={<ViewStore/>}/>
      <Route path='/addmachine' element={<AddMachine/>}/>
      <Route path='/viewmachine' element={<ViewMachines/>}/>
      <Route path='/workout' element={<WorkoutScheduling/>}/>
      <Route path='/workout' element={<WorkoutScheduling/>}/>
      <Route path='/viewworkout' element={<ViewWorkout/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/adminfeedback' element={<AdminFeedback/>}/>
      <Route path='/createProfile' element={<CreateProfile/>}/>
      <Route path='/getProfile' element={<GetProfile/>}/>
      <Route path='/adminProfile' element={<AdminGetProfile/>}/>
      <Route path='/bmi' element={<BMI/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/adminviewTrainers' element={<AdminTrainersManagement/>}/>
      <Route path='/adminviewmachines' element={<AdminMachineManagement/>}/>
      <Route path='/adminviewaccessories' element={<AdminAccessriesManagement/>}/>
      <Route path='/deleteSchedule' element={<DeleteSchedule/>}/>
      <Route path='/dietplan' element={<CreateDietPlan/>}/>
      <Route path='/getdietplan' element={<GetDietPlan/>}/>
      <Route path='/admindietplan' element={<AdminDietPlans/>}/>
      <Route path='/packagepayment' element={<PackagePayment/>}/>
      <Route path='/storepayment' element={<StorePayment/>}/>
      <Route path='/package' element={<Package/>}/>
      <Route path='/trainerpage' element={<TrainerPage/>}/>
      <Route path='/gettrainerprofile' element={<GetTrainerProfile/>}/>
      
  
    </Routes>
    </BrowserRouter>
  );
}

export default App;

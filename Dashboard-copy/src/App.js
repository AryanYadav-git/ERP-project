import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import axios from 'axios';



import { Navbar, Sidebar, ThemeSettings, Skeleton, PrivateRoutes } from './components';
import { Home, CuttingDepartment,ProductionDepartment, FinishingDepartment, ErpDepartment, Error, Login, CuttingTemp, ActiveJobs, CuttingReports, ProductionReceived, ProductionReports, AllFinishingReports, FinishingReceived, Ironing, SumUpReport, ErpOrdersDetails, NewErpOrder, Packing} from './pages';
import './app.css';

import { useStateContext } from './contexts/ContextProvider';
import ReceivedCutting from './pages/ReceivedCutting';

const App = () => {
  axios.defaults.withCredentials = true;
  const {setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, user, department} = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            {user && <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>}
            {/* <InitUser/> */}
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* home  */}
                {!user && <Route path="/" element={<Login />} />}

                {user && <Route path="/home" element={(<Home />)} />}

                {/* department  */}
                <Route element={<PrivateRoutes/>}>
                  <Route path="/" element={(<Home />)} />
                  <Route path="/cutting-department" element={<CuttingDepartment />} />
                  <Route path="/cutting-department/active-jobs" element={<ActiveJobs />} />
                  <Route path="/cutting-department/recieved" element={<ReceivedCutting />} />
                  <Route path="/cutting-department/reports" element={<CuttingReports />} />
                  <Route path="/production-department" element={<ProductionDepartment />} />
                  <Route path="/production-department/recieved" element={<ProductionReceived />} />
                  <Route path="/production-department/reports" element={<ProductionReports />} />
                  <Route path="/finishing-department" element={<FinishingDepartment />} />
                  <Route path="/finishing-department/received" element={<FinishingReceived />} />
                  <Route path="/finishing-department/all-reports" element={<AllFinishingReports />} />
                  <Route path="/finishing-department/ironing" element={<Ironing />} />
                  <Route path="/finishing-department/packing" element={<Packing />} />
                  <Route path="/erp-department" element={<ErpDepartment />} />
                  <Route path="/erp-department/orders" element={<ErpOrdersDetails />} />
                  <Route path="/erp-department/new" element={<NewErpOrder />} />
                  <Route path="/sum-up-report" element={<SumUpReport />} />
                </Route>
                
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
                

              </Routes>
            </div>
           
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

// export function InitUser() {
//   const {setUser} = useStateContext();
//   console.log('in init');
//   const init = async() => {
//       try {
//         console.log('1');
//           const response = await axios.get(`http://localhost:3000/admin/me`, {
//               headers: {
//                   "Authorization": localStorage.getItem("token")
//               }
//           });
//           console.log('hello2')
//           console.log(response.data);
//           response.data.username?
//               setUser(response.data.username
//               )
//           :   setUser(null);
//       }
//       catch (e) {
//         setUser(null)
//       }
//   };

//   useEffect(() => {
//       init();
//   }, []);

//   return <></>
// }

export default App;

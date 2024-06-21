import React, { createContext, useContext, useState } from 'react';
import avatar from '../data/avatar.jpg';
import avatar2 from '../data/avatar2.jpg';
import avatar3 from '../data/avatar3.png';
import avatar4 from '../data/avatar4.jpg';
import product1 from '../data/product1.jpg';
import product2 from '../data/product2.jpg';
import product3 from '../data/product3.jpg';
import product4 from '../data/product4.jpg';
import product5 from '../data/product5.jpg';
import product6 from '../data/product6.jpg';
import product7 from '../data/product7.jpg';
import product8 from '../data/product8.jpg';

const StateContext = createContext();

const initialState = {

    userProfile: false,
};

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [name, setName] = useState(null);
    const [user, setUser] = useState(null);
    const [department, setDepartment] = useState(null);

    const [erpData, setErpData] = useState([

        {
            orderNo:2401,
            modelNo:"M01",
            color:"grey",
            totalQty:5000,
            delDate:'200',
            exJprDate:"22",
            status:'Inactive'
        }
//   {
//     EmployeeID: 1,
//     Name: 'Nancy Davolio',
//     Title: 'Sales Representative',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//     avatar3,
//   },
//   {
//     EmployeeID: 2,
//     Name: 'Nasimiyu Danai',
//     Title: 'Marketing Head',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar3,
//   },
//   {
//     EmployeeID: 3,
//     Name: 'Iulia Albu',
//     Title: 'HR',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar4,
//   },
//   {
//     EmployeeID: 4,
//     Name: 'Siegbert Gottfried',
//     Title: 'Marketing Head',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar2,
//   },
//   {
//     EmployeeID: 5,
//     Name: 'Omar Darobe',
//     Title: 'HR',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar,
//   },
//   {
//     EmployeeID: 4,
//     Name: 'Penjani Inyene',
//     Title: 'Marketing Head',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar,
//   },
//   {
//     EmployeeID: 5,
//     Name: 'Miron Vitold',
//     Title: 'HR',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//       avatar2,
//   },
//   {
//     EmployeeID: 1,
//     Name: 'Nancy Davolio',
//     Title: 'Sales Representative',
//     HireDate: '01/02/2021',
//     Country: 'USA',
//     ReportsTo: 'Carson',
//     EmployeeImage:
//     avatar2,

//   }
])

const [activeOrders, setActiveOrders] = useState([
    {
        orderNo:2401,
        modelNo:"M01",
        color:"grey",
        totalQty:5000,
        delDate:'200',
        exJprDate:"22",
        status:'Inactive'
    }
])

    const [cuttingReceivedData, setCuttingReceivedData] = useState([
        {
            "orderNo":2402 ,
            "modelNo": "M01",
            'color':'beige',
            "size": "xs",
            "qty": 175
        }
    ]);

    const [cuttingReportsData, setCuttingReportsData] = useState([
        {
            "orderNo":2402 ,
            "modelNo": "M01",
            "size": "xs",
            "layer": 7,
            "lineNo": 2,
            "qty": 175
        }
    ]);
    const [productionReceivedData, setProductionReceivedData] = useState([
        {
            "orderNo":2402 ,
            "modelNo": "M01",
            'color':'beige',
            "size": "xs",
            "qty": 175
        }
    ]);

    const [productionReportsData, setProductionReportsData] = useState([
        {
            "orderNo":2402 ,
            "modelNo": "M01",
            "size": "xs",
            "layer": 7,
            "lineNo": 2,
            "qty": 175
        }
    ]);

    const [sumupReportData, setSumUpReportData] = useState([]);
    

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

    return (
        <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, user, setUser, department, setDepartment, erpData, setErpData, name, setName, cuttingReceivedData, setCuttingReceivedData, cuttingReportsData, setCuttingReportsData, productionReceivedData, setProductionReceivedData, productionReportsData, setProductionReportsData, activeOrders, setActiveOrders, sumupReportData, setSumUpReportData}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

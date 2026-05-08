import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ordercover from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RecomendCard from '../Shared/RecomendCard';

const Order = () => {
    const location = useLocation();
    const categoryMap = { 'pizza': 0, 'salad': 1, 'soup': 2, 'dessert': 3, 'drinks': 4, 'offered': 0 };
    const initialTabIndex = location.state?.category ? categoryMap[location.state.category] : 0;
    
    const [tabIndex, setTabIndex] = useState(initialTabIndex);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('https://sarinda-server.vercel.app/menu')
            .then(res => res.json())
            .then(data => setMenu(data));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ['pizza', 'salad', 'soup', 'dessert', 'drinks'];

    const getFilteredItems = (category) => {
        return menu.filter(item => item.category === category);
    };

    return (
        <div>
            <Cover img={ordercover} title={"ORDER FOOD"} subTitle={"Order online , Delivery within one hour , No COD"}></Cover>
            <div className='mt-5 mb-10 px-4'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className='flex justify-center gap-2 md:gap-4 flex-wrap border-b-2 border-amber-600 pb-4'>
                        <Tab className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2 ${tabIndex === 0 ? 'bg-amber-600 text-white border-amber-700 shadow-lg scale-105' : 'bg-white text-base-content border-amber-600 hover:bg-amber-100 hover:shadow-md'}`}>PIZZA</Tab>
                        <Tab className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2 ${tabIndex === 1 ? 'bg-amber-600 text-white border-amber-700 shadow-lg scale-105' : 'bg-white text-base-content border-amber-600 hover:bg-amber-100 hover:shadow-md'}`}>SALAD</Tab>
                        <Tab className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2 ${tabIndex === 2 ? 'bg-amber-600 text-white border-amber-700 shadow-lg scale-105' : 'bg-white text-base-content border-amber-600 hover:bg-amber-100 hover:shadow-md'}`}>SOUP</Tab>
                        <Tab className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2 ${tabIndex === 3 ? 'bg-amber-600 text-white border-amber-700 shadow-lg scale-105' : 'bg-white text-base-content border-amber-600 hover:bg-amber-100 hover:shadow-md'}`}>DESSERT</Tab>
                        <Tab className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-300 border-2 ${tabIndex === 4 ? 'bg-amber-600 text-white border-amber-700 shadow-lg scale-105' : 'bg-white text-base-content border-amber-600 hover:bg-amber-100 hover:shadow-md'}`}>DRINKS</Tab>
                    </TabList>
                    {categories.map((category, index) => (
                        <TabPanel key={index}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                                {getFilteredItems(category).map(item => (
                                    <RecomendCard key={item._id} item={item} />
                                ))}
                            </div>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default Order;
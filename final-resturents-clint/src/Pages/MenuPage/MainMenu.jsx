import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import imga from '../../assets/menu/banner3.jpg'
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';
import dessert from '../../assets/menu/dessert-bg.jpeg'
import salad from '../../assets/menu/salad-bg.jpg'
import soup from '../../assets/menu/soup-bg.jpg'

const MainMenu = () => {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('https://sarinda-server.vercel.app/menu')
            .then((response) => response.json())
            .then((data) => setMenuItems(data));
    }, []);

    const handleOrderNow = (category) => {
        navigate('/order', { state: { category } });
    };

    const offeredItems = menuItems.filter((item) => item.category === 'offered');
    const dessertItems = menuItems.filter((item) => item.category === 'dessert');
    const soupItems = menuItems.filter((item) => item.category === 'soup');
    const saladItems = menuItems.filter((item) => item.category === 'salad');

    const renderMenuItems = (items) => (
        <div className="grid gap-6 pb-16 md:grid-cols-2">
            {items.map((item) => (
                <MenuItem key={item._id} item={item} />
            ))}
        </div>
    );

    return (
        <div>
            <Helmet>
                <title>SARINDA | MENU</title>
            </Helmet>
            <Cover img={imga} title={"our menu"} subTitle={"Would you like to test a dish ?"}></Cover>
            <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
                <SectionTitle
                heading={"Todays Offer"}
                subHeading={"Don't miss"}
                ></SectionTitle>
                <div className="text-center mb-8">
                    <button onClick={() => handleOrderNow('offered')} className="btn btn-md bg-amber-600 border-none text-white hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
                        ORDER NOW
                    </button>
                </div>
                {renderMenuItems(offeredItems)}

                <Cover img={dessert} title={"our dessert menu"} subTitle={"There Always Space for dessert ?"}></Cover>
                <SectionTitle
                heading={"dessert"}
                subHeading={"There Always Space for dessert"}
                ></SectionTitle>
                <div className="text-center mb-8">
                    <button onClick={() => handleOrderNow('dessert')} className="btn btn-md bg-amber-600 border-none text-white hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
                        ORDER NOW
                    </button>
                </div>
                {renderMenuItems(dessertItems)}

                <Cover img={soup} title={"our soup menu"} subTitle={"Would you like to test a soup ?"}></Cover>
                <SectionTitle
                heading={"soup"}
                subHeading={"A warm way to start"}
                ></SectionTitle>
                <div className="text-center mb-8">
                    <button onClick={() => handleOrderNow('soup')} className="btn btn-md bg-amber-600 border-none text-white hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
                        ORDER NOW
                    </button>
                </div>
                {renderMenuItems(soupItems)}

                <Cover img={salad} title={"our salad menu"} subTitle={"Would you like to test a helthy dish ?"}></Cover>
                <SectionTitle
                heading={"salad"}
                subHeading={"Fresh and light"}
                ></SectionTitle>
                <div className="text-center mb-8">
                    <button onClick={() => handleOrderNow('salad')} className="btn btn-md bg-amber-600 border-none text-white hover:bg-amber-700 hover:shadow-lg transition-all duration-300">
                        ORDER NOW
                    </button>
                </div>
                {renderMenuItems(saladItems)}
            </div>

        </div>
    );
};

export default MainMenu;
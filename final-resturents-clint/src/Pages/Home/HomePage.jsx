import React from 'react';
import Banner from './Banner';
import FoodCatagory from './FoodCatagory';
import Spacial from './Spacial';
import Menu from './Menu';
import Recomendation from './Recomendation';
import CallUs from './CallUs';
import Featured from './Featured';
import Tastimonials from './Tastimonials';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <FoodCatagory></FoodCatagory>
            <Spacial></Spacial>
            <Menu></Menu>
            <CallUs></CallUs>
            <Recomendation></Recomendation>
            <Featured></Featured>
            <Tastimonials></Tastimonials>
        </div>
    );
};

export default HomePage;

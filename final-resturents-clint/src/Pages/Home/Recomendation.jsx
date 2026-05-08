import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';
import RecomendCard from '../Shared/RecomendCard';

const Recomendation = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('https://sarinda-server.vercel.app/menu')
            .then((res) => res.json())
            .then((data) => {
                setMenu(data.filter((item) => item.category === 'dessert').slice(0, 6))
            });
    }, []);

    return (
        <div className="px-4">
            
            <section className='mx-auto mb-12 max-w-6xl'>
                <SectionTitle
                    heading={"Chef Recommend "} subHeading={"Should Try"}
                ></SectionTitle>
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {
                        menu.map(item => <RecomendCard
                        key={item._id}
                        item={item}
                        ></RecomendCard>)
                    }
                </div>

            </section>
        </div>
    );
};

export default Recomendation;
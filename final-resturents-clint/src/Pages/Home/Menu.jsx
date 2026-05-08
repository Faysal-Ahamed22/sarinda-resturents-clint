import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';

const Menu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('https://sarinda-server.vercel.app/menu')
            .then((res) => res.json())
            .then((data) => {
                setMenu(data.filter((item) => item.category === 'popular'))
            });
    }, []);

    return (
        <div className="px-4">
            <section className='mx-auto mb-12 max-w-6xl'>
                <SectionTitle
                    heading={"From Our Menu "} subHeading={"Chect it Out"}
                ></SectionTitle>
                <div className='grid gap-5 md:grid-cols-2'>
                    {
                        menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                        ></MenuItem>)
                    }
                </div>

            </section>
        </div>
    );
};

export default Menu;
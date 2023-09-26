import React from 'react';

interface navbaritemProps {
    label: string;
}

const NavbarItem: React.FC<navbaritemProps> = ({
    label
}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
           {label}
        </div>
    )
}

export default NavbarItem;
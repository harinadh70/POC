import { useState } from 'react';

const SubHeader = () => {
    const [active, setActive] = useState('Override Summary');

    const menuItems = [
        'Umb Rate',
        'Rate',
        'Worksheets',
        'Quick View',
        'LOB Action Menu',
        'Status Page',
        'Note Pad',
        'Policy Numbering',
        'Override Summary',
    ];

    return (
        <div className="bg-[#E9F1FF] px-8! py-2 ">
            <ul className="flex space-x-6 text-sm text-white overflow-x-auto items-center h-12">
                {menuItems.map((item) => (
                    <li
                        key={item}
                        onClick={() => setActive(item)}
                        className={`cursor-pointer whitespace-nowrap transition px-3 no-underline text-[#9AA7⟪?⟫
 ${active === item ? 'border-white font-bold text-[15px] text-[#00205B]' : 'border-transparent'}`}
                    >
                        <a className="no-underline text-[15px]" target=" blank">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { SubHeader };

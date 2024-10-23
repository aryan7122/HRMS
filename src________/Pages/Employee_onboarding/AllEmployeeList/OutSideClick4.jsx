import { useState, useEffect, useRef } from 'react';

const OutsideClick4 = () => {
    const [isOpen, setIsOpen] = useState(null); // By default, no dropdown is open
    const ref = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            ref.current &&
            !ref.current.contains(event.target) &&
            (!buttonRef.current || !buttonRef.current.contains(event.target))
        ) {
            setIsOpen(null); // Close dropdown if clicked outside
        }
    };

    const handleToggle = (index) => {
        setIsOpen((prev) => (prev === index ? null : index)); // Open or close based on index
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { isOpen, ref, buttonRef, handleToggle };
};

export default OutsideClick4;

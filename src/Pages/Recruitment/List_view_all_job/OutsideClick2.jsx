import { useState, useEffect, useRef } from 'react';

export const OutsideClick2 = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const ref = useRef(null); // Ref for the dropdown container
    const buttonRef = useRef(null); // Ref for the button to toggle dropdown

    const handleClickOutside = (event) => {
        if (
            ref.current && !ref.current.contains(event.target) &&
            (!buttonRef.current || !buttonRef.current.contains(event.target))
        ) {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { isOpen, ref, buttonRef, handleToggle };
};

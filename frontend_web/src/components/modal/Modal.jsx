import { useEffect } from 'react';

export default function Modal({ children, isOpen, onClose }) {
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="
            fixed top-0 left-0 min-h-[100vh] min-w-[100vw] bg-gray-800/40
            flex justify-center items-center z-50
            "
        >
            <div className="border bg-white px-4 py-2 shadow-lg">
                <div className='flex justify-end'>
                    <button type="button" className="transition cursor-pointer border border-[transparent] hover:border-black px-1" onClick={onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
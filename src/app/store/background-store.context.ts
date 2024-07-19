import { createContext, useContext, useLayoutEffect, useState } from 'react';

export const ThemeContext = createContext<string | null>(null);

export const useTheme = () => {
    const [theme, setTheme] = useState(window.localStorage.getItem('background') || '1');

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('background', theme);
    }, [theme]);

    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error('В провайдер не обернул');
    }
    return { theme, setTheme };
};

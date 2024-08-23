import React, {useEffect, useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ScriptAttributes = {callback?: () => void} & Record<string, any> & React.HTMLProps<HTMLScriptElement>;

export const useScript = (attrs: ScriptAttributes): [boolean] => {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const script: HTMLScriptElement = document.createElement('script');
        script.async = true;
        script.id = 'script_id';
        Object.entries(attrs).forEach(([name, value]) => {
            if (name === 'callback') return;
            if (name !== 'innerText') {
                script.setAttribute(name, value);
            } else {
                script.innerHTML = value.replace(/(\r\n|\n|\r)/gm, '');
            }
        });

        script.onload = () => {
            attrs?.callback?.();
            setLoading(false);
        };

        setLoading(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attrs.src, attrs?.callback]);

    return [isLoading];
};

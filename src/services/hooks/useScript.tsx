import React, {useEffect, useState} from 'react';

type ScriptAttributes = {src: string} & Record<string, any> & React.HTMLProps<HTMLScriptElement>;

export const useScript = (attrs: ScriptAttributes): [boolean] => {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const script: HTMLScriptElement = document.createElement('script');
        script.async = true;
        script.id = 'script_id';
        Object.entries(attrs).forEach(([name, value]) => {
            if (name !== 'innerText') {
                script.setAttribute(name, value);
            } else {
                script.innerHTML = value.replace(/(\r\n|\n|\r)/gm, '');
            }
        });

        script.onload = () => setLoading(false);

        setLoading(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [attrs.src]);

    return [isLoading];
};

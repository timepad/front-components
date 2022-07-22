import React, {ChangeEvent, useCallback, useState, useRef, Fragment} from 'react';
import {fileUpload} from 'services/Helpers/UploadHelper';
import {getFileNameOnUpload} from 'services/Helpers/UploadHelper/UploadHelper';

import IconDelete from '../../../assets/svg/24/icon-delete-24.svg';
import {Typography, Button} from 'index';

export interface IUploadInputProps {
    name?: string;
    label?: string;
    onChange?: (name: string, value: string) => void;
    setStatus?: (status: string) => void;
}

export const UploadInput = ({name, onChange, setStatus}: IUploadInputProps) => {
    const inputRef = useRef<HTMLInputElement>();

    const [filename, setFilename] = useState(null);

    const [filenameWithoutExtension, extension] = (() => {
        const filenameWithoutExtension = filename?.split('.');
        const fileExtension = filenameWithoutExtension?.pop();
        return [filenameWithoutExtension?.join(), fileExtension];
    })();

    const clearInput = () => {
        inputRef.current.value = null;
        setFilename(null);
        onChange(name, '');
    };

    const fileChose = useCallback(
        async (e: ChangeEvent) => {
            setFilename(getFileNameOnUpload(e));

            setStatus('loading');

            await fileUpload({
                e: e as unknown as Event,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                setProgress: () => {},
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onLoad: () => {},
                onUpload: (url: string) => {
                    setStatus(null);
                    onChange(name, url);
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onError: () => {},
            });
        },
        [name, onChange, setStatus],
    );

    return (
        <div className="">
            <div className="lbrick-1-5" />
            <input
                ref={inputRef}
                type="file"
                onChange={fileChose}
                style={{visibility: 'hidden', position: 'absolute', width: 0, height: 0}}
            />
            <div className="lflex lflex--align-centered lflex--wrap">
                <Button
                    variant={Button.variant.secondary}
                    label="Приложить файл..."
                    onClick={() => inputRef.current?.click()}
                />
                {filename && (
                    <Fragment>
                        <div className="lgap" />
                        <Typography.Small
                            responsive
                            noPadding
                            noWrap
                            className="lflex lflexchild--stretched"
                            style={{minWidth: 0}}
                        >
                            <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                {filenameWithoutExtension}
                            </span>
                            <span>.{extension}</span>
                        </Typography.Small>
                        <div className="lgap" />
                        <Button variant={Button.variant.transparent} onClick={clearInput} icon={<IconDelete />} />
                    </Fragment>
                )}
            </div>
            <div className="lbrick" />
        </div>
    );
};

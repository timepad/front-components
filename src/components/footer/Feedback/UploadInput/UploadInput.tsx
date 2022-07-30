import React, {ChangeEvent, useCallback, useState, useRef, Fragment, FC} from 'react';
import IconDelete from '../../../../assets/svg/24/icon-delete-24.svg';
import {Typography, Button} from 'index';
import {fileUpload, getFileNameOnUpload} from './upload.utils';

export interface IUploadInputProps {
    name?: string;
    label?: string;
    onChange?: (name: string, value: string) => void;
    setStatus?: (status: string) => void;
}

export const UploadInput: FC<IUploadInputProps> = ({
    name = '',
    onChange = () => undefined,
    setStatus = () => undefined,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [filename, setFilename] = useState<string | null>(null);

    const [filenameWithoutExtension, extension] = (() => {
        const filenameWithoutExtension = filename?.split('.');
        const fileExtension = filenameWithoutExtension?.pop();
        return [filenameWithoutExtension?.join(), fileExtension];
    })();

    const clearInput = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.value = '';
            setFilename(null);
            onChange(name, '');
        }
    };

    const fileChose = useCallback(
        async (e: ChangeEvent) => {
            setFilename(getFileNameOnUpload(e));

            setStatus('loading');

            await fileUpload({
                e: e as unknown as Event,
                setProgress: () => undefined,
                onLoad: () => undefined,
                onUpload: (url: string) => {
                    setStatus('');
                    onChange(name, url);
                },
                onError: () => undefined,
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

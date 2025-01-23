import React, {useRef, useState} from 'react';
import cx from 'classnames';

import './index.less';
import {UploadApiService} from './UploadApiService';
import {IUploadInputProps} from './UploadInput.types';
import {Brick} from '../brick';
import {Button} from '../button';
import {Gap} from '../gap';
import {Typography} from '../typography';
import IconDelete from '../../assets/svg/24/icon-delete-24.svg';
import {component, layout} from '../../services/helpers/classHelpers';

export const UploadInput: React.FC<IUploadInputProps> = ({
    label = '',
    name,
    onChange,
    setStatus,
    config,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onLoad = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setProgress = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError = () => {},
}) => {
    const uploadApiService = new UploadApiService(config);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [filename, setFilename] = useState<string | null>(null);

    const [filenameWithoutExtension, extension] = (() => {
        const filenameWithoutExtension = filename?.split('.');
        const fileExtension = filenameWithoutExtension?.pop();
        return [filenameWithoutExtension?.join(), fileExtension];
    })();

    const handleDeleteFileClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setFilename(null);
            onChange?.(name, '');
        }
    };

    const handleUploadInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(uploadApiService.getFileName(event));

        setStatus?.('loading');

        await uploadApiService.uploadFile({
            event,
            setProgress,
            onLoad,
            onUpload: (url: string) => {
                setStatus?.('');
                onChange?.(name, url);
            },
            onError,
        });
    };

    return (
        <div>
            <Brick size={1.5} />
            <input
                ref={inputRef}
                type="file"
                onChange={handleUploadInputChange}
                className={component('upload-input', 'input')()}
            />
            <div className={layout('flex')({'align-centered': true, wrap: true})}>
                <Button
                    variant={Button.variant.secondary}
                    label={label || 'Приложить файл...'}
                    onClick={() => inputRef.current?.click()}
                />
                {filename && (
                    <>
                        <Gap />
                        <Typography.Small
                            responsive
                            noPadding
                            noWrap
                            className={cx(layout('flex')(), layout('flexchild--stretched')())}
                            style={{minWidth: 0}}
                        >
                            <span className={component('upload-input', 'file-extension')()}>
                                {filenameWithoutExtension}
                            </span>
                            <span>.{extension}</span>
                        </Typography.Small>
                        <Gap />
                        <Button
                            variant={Button.variant.transparent}
                            onClick={handleDeleteFileClick}
                            icon={<IconDelete />}
                        />
                    </>
                )}
            </div>
            <Brick />
        </div>
    );
};

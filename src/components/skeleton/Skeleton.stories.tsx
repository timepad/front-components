import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent} from '../../services/helpers/storyBookHelpers';

import {Skeleton} from './Skeleton';
import {Typography} from '../typography';
import {Pic} from '../userpic';

export default {
    title: 'Skeleton',
    component: Skeleton,
} as Meta;

export const BasicSkeleton: IStorybookComponent = () => {
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <Skeleton width={50} height={50} variant={'circle'} />
                <Skeleton width={500} height={50} variant={'rect'} />
                <Skeleton width={300} height={25} variant={'rect'} />
                <Skeleton width={150} height={15} variant={'rect'} />
            </div>
        </div>
    );
};
BasicSkeleton.storyName = 'BasicSkeleton';

export const WithAnimationSkeleton: IStorybookComponent = () => {
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <div>With wave animation</div>
                <Skeleton width={50} height={50} variant={'circle'} animation={'wave'} />
                <Skeleton width={500} height={50} variant={'rect'} animation={'wave'} />
                <Skeleton width={300} height={25} variant={'rect'} animation={'wave'} />
                <Skeleton width={150} height={15} variant={'rect'} animation={'wave'} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <div>With pulse animation</div>
                <Skeleton width={50} height={50} variant={'circle'} animation={'pulse'} />
                <Skeleton width={500} height={50} variant={'rect'} animation={'pulse'} />
                <Skeleton width={300} height={25} variant={'rect'} animation={'pulse'} />
                <Skeleton width={150} height={15} variant={'rect'} animation={'pulse'} />
            </div>
        </div>
    );
};
WithAnimationSkeleton.storyName = 'WithAnimationSkeleton';

export const CompositeSkeletonWithPaddings: IStorybookComponent = () => {
    return (
        <div>
            <div>
                <div>With children typography</div>
                <Skeleton variant="circle" withPaddings>
                    <Pic label={'Content'} />
                </Skeleton>
                <Skeleton withPaddings>
                    <Typography.Header style={{backgroundColor: 'white'}} fontWeight="black">
                        Font Weight: black
                    </Typography.Header>
                </Skeleton>
                <Skeleton withPaddings>
                    <Typography.Multiple style={{backgroundColor: 'white'}}>
                        <Typography.Small className="t-color-gray-50">Small 16-16</Typography.Small>
                        <Typography.Body size={16}>Body 16-16</Typography.Body>
                    </Typography.Multiple>
                </Skeleton>
                <Skeleton withPaddings animation="wave">
                    <Typography.Multiple style={{backgroundColor: 'white'}}>
                        <Typography.Subheader responsive>Subheader responsive 32–32(24-28)</Typography.Subheader>
                        <Typography.Caption responsive>Caption 16-16</Typography.Caption>
                    </Typography.Multiple>
                </Skeleton>
            </div>

            <div>
                <Pic label={'Content'} />
                <Typography.Header style={{backgroundColor: 'white'}} fontWeight="black">
                    Font Weight: black
                </Typography.Header>
                <Typography.Multiple style={{backgroundColor: 'white'}}>
                    <Typography.Small className="t-color-gray-50">Small 16-16</Typography.Small>
                    <Typography.Body size={16}>Body 16-16</Typography.Body>
                </Typography.Multiple>
                <Typography.Multiple style={{backgroundColor: 'white'}}>
                    <Typography.Subheader responsive>Subheader responsive 32–32(24-28)</Typography.Subheader>
                    <Typography.Caption responsive>Caption 16-16</Typography.Caption>
                </Typography.Multiple>
            </div>
        </div>
    );
};
CompositeSkeletonWithPaddings.storyName = 'CompositeSkeletonWithPaddings';

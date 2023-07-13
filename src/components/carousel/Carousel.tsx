import React, {useCallback, useEffect, useRef, useState} from 'react';
import ScrollContainer, {ScrollContainerProps} from 'react-indiana-drag-scroll';

import './ccarousel.less';
import {SliderBtn} from './SliderBtn';
import {component} from '../../services/helpers/classHelpers';

interface IContentCoords {
    start: number;
    end: number;
}

interface ICarouselProps extends Omit<ScrollContainerProps, 'ref' | 'vertical'> {
    nextBtn?: React.ReactNode;
    prevBtn?: React.ReactNode;
}

export const Carousel: React.FC<ICarouselProps> = ({
    children,
    nextBtn = <SliderBtn direction="next" />,
    prevBtn = <SliderBtn direction="prev" />,
    className = '',
    horizontal = true,
    ...props
}) => {
    //variables
    const carouselClassName = component('carousel', 'track')({vertical: !horizontal});
    const countSlides = React.Children.toArray(children).filter(Boolean).length;
    //hooks
    const [contentMap, setContentMap] = useState<Array<IContentCoords>>([]);
    const [sideOffset, setSideOffset] = useState<number>(0);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [allowScroll, setAllowScroll] = useState<boolean>(false);
    const trackRef = useRef<ScrollContainer>(null);
    //callbacks
    const countVisibleSlides = useCallback(() => {
        const track = trackRef?.current?.getElement();
        if (track) {
            const trackStartEdge = horizontal ? track.scrollLeft : track.scrollTop;
            const trackEndEdge = trackStartEdge + (horizontal ? track.clientWidth : track.clientHeight);
            const slides = contentMap.filter((slide) => slide.start >= trackStartEdge && slide.end <= trackEndEdge);
            return slides.length;
        }
        return 0;
    }, [contentMap, horizontal]);

    const paginate = useCallback(
        (next: boolean) => {
            const track = trackRef?.current?.getElement();
            if (track) {
                const count = countVisibleSlides();
                const currentOffset = horizontal ? track.scrollLeft : track.scrollTop;
                const currentSlideIndex = contentMap.findIndex(
                    (slide) => slide.start <= currentOffset && slide.end >= currentOffset,
                );

                const targetIndex = next
                    ? Math.min(currentSlideIndex + count + 1, contentMap.length - 1)
                    : Math.max(currentSlideIndex - count + 1, 0);

                if (targetIndex >= 0) {
                    if (horizontal) {
                        track.scrollTo({left: contentMap[targetIndex]?.start - sideOffset, behavior: 'smooth'});
                    } else {
                        track.scrollTo({top: contentMap[targetIndex]?.start - sideOffset, behavior: 'smooth'});
                    }
                }
            }
        },
        [contentMap, countVisibleSlides, sideOffset, horizontal],
    );

    const prev = () => paginate(false);
    const next = () => paginate(true);

    const onScrollProgress = useCallback(() => {
        const track = trackRef?.current?.getElement();
        if (track) {
            let scrollProgress;
            if (horizontal) {
                scrollProgress = track.scrollLeft / (track.scrollWidth - track.clientWidth);
            } else {
                scrollProgress = track.scrollTop / (track.scrollHeight - track.clientHeight);
            }
            setScrollProgress(scrollProgress);
        }
    }, [horizontal]);

    const onLayoutChange = useCallback(() => {
        const track = trackRef?.current?.getElement();
        if (countSlides && track) {
            const childs = track.childNodes;
            const newContentMap: Array<IContentCoords> = [];
            (Array.from(childs) as HTMLElement[]).forEach((child: HTMLElement) => {
                const startCoord = horizontal ? child.offsetLeft : child.offsetTop;
                const endCoord = startCoord + (horizontal ? child.offsetWidth : child.offsetHeight);
                newContentMap.push({start: startCoord, end: endCoord});
            });
            setContentMap(newContentMap);
        }
    }, [countSlides, horizontal]);

    const onScroll = useCallback((remove: boolean) => {
        const track = trackRef.current?.getElement();
        if (track) {
            if (remove) {
                track.classList.remove('indiana-scroll-container--dragging');
            } else {
                track.classList.add('indiana-scroll-container--dragging');
            }
        }
    }, []);

    const onStartScroll = useCallback(() => onScroll(false), [onScroll]);
    const onEndScroll = useCallback(() => onScroll(true), [onScroll]);
    //effects
    useEffect(() => {
        setSideOffset(contentMap?.[0]?.start || 0);
    }, [contentMap]);

    useEffect(() => {
        const visibleSlides = countVisibleSlides();
        if (countSlides > visibleSlides && visibleSlides > 0) {
            setAllowScroll(true);
        } else {
            setAllowScroll(false);
        }
    }, [countSlides, countVisibleSlides]);

    useEffect(() => {
        window.addEventListener('resize', onLayoutChange);
        onLayoutChange();

        return () => {
            window.removeEventListener('resize', onLayoutChange);
        };
    }, [onLayoutChange]);

    useEffect(() => {
        const track = trackRef.current?.getElement();

        if (track) {
            track.addEventListener('scroll', onScrollProgress);

            return () => track.removeEventListener('scroll', onScrollProgress);
        }
    }, [onScrollProgress]);

    return (
        <div className="ccarousel">
            <ScrollContainer
                className={`${carouselClassName} ${className}`}
                ref={trackRef as React.MutableRefObject<ScrollContainer> & React.ReactNode}
                onStartScroll={onStartScroll}
                onEndScroll={onEndScroll}
                horizontal={horizontal}
                {...props}
            >
                {scrollProgress > 0 && allowScroll && <div onClick={prev}>{prevBtn}</div>}
                {React.Children.toArray(children).filter(Boolean) /* fix zero children */}
                {scrollProgress < 1 && allowScroll && <div onClick={next}>{nextBtn}</div>}
            </ScrollContainer>
        </div>
    );
};

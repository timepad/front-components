import PHIcon1 from '../../assets/svg/placeholder/placholder_1.svg';
import PHIcon2 from '../../assets/svg/placeholder/placholder_2.svg';
import PHIcon3 from '../../assets/svg/placeholder/placholder_3.svg';
import PHIcon4 from '../../assets/svg/placeholder/placholder_4.svg';
import PHIcon5 from '../../assets/svg/placeholder/placholder_5.svg';
import PHIcon6 from '../../assets/svg/placeholder/placholder_6.svg';
import React, {DependencyList, useMemo} from 'react';

const PlaceholderIcons = [PHIcon1, PHIcon2, PHIcon3, PHIcon4, PHIcon5, PHIcon6];

export const useRandomPlaceholderIcon = (
    deps: DependencyList | undefined,
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => PlaceholderIcons[Math.floor(Math.random() * PlaceholderIcons.length)], deps);
};

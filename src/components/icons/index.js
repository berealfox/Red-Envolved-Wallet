export { default as HomeIcon } from './HomeIcon';
export { default as EarnIcon } from './EarnIcon';
export { default as NFTsIcon } from './NFTsIcon';
export { default as AppsIcon } from './AppsIcon';
export { default as ActivityIcon } from './ActivityIcon';
export { default as SettingsIcon } from './SettingsIcon';
export { default as SuiIcon } from './SuiIcon';
export { BuySellIcon, ReceiveIcon, SendIcon, SwapIcon, SearchIcon } from './ActionIcons.js';

import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

// Additional icons for send/receive screens
export const ArrowLeftIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const CopyIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={color} strokeWidth="2" fill="none"/>
  </Svg>
);

export const ShareIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" fill="none"/>
    <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="2"/>
    <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const ArrowRightIcon = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 5L19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);
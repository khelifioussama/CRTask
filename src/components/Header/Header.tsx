import React from 'react';
import {Text} from 'react-native';
import {colors} from '@constants';
import styles from './Header.styles';

interface HeaderProps {
  headerFirstLine: string;
  headerHighlightedText: string;
  headerSecondLine?: string;
  textColor?: string;
  highlightedTextColor?: string;
}
/*no need to use !! */
const Header = ({
  headerFirstLine,
  headerSecondLine,
  headerHighlightedText,
  textColor = colors.textPrimary,
  highlightedTextColor = colors.blue,
}: HeaderProps) => (
  <>
    <Text style={[styles.headerText, !!textColor && {color: textColor}]}>
      {headerFirstLine}
    </Text>
    <Text style={styles.headerText}>
      {headerSecondLine && `${headerSecondLine} `}
      <Text
        style={[
          styles.headerHighlightedText,
          !!highlightedTextColor && {color: highlightedTextColor},
        ]}>
        {headerHighlightedText}
      </Text>
    </Text>
  </>
);

export default Header;

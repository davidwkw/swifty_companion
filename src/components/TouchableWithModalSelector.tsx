import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as COLORS from '../styles/Colors';

type OptionData = {title: string, callback: () => void, icon: string}

type DropdownMenuProps = PropsWithChildren<{
  label: string;
  left?: JSX.Element;
  right?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  expandedIconName?: string;
  unexpandedIconName?: string;
  modalStyle?: StyleProp<ViewStyle>;
  dropdownVisible: boolean;
  onButtonPress?: () => void;
  externalPress?: () => void;
  modalOptions: OptionData[]
}>;

export default function DropdownMenu({
  label,
  left,
  labelStyle,
  containerStyle,
  modalStyle,
  right,
  dropdownVisible,
  onButtonPress,
  externalPress,
  modalOptions,
}: DropdownMenuProps): JSX.Element {
  return (
    <>
      <TouchableOpacity
        style={[styles.touchableContainer, containerStyle]}
        onPress={onButtonPress}>
        {left}
        <Text style={[styles.labelText, labelStyle]}>{label}</Text>
        {right}
      </TouchableOpacity>
      <Modal
        transparent
        style={[styles.dropdownModal, modalStyle]}
        visible={dropdownVisible}
        onRequestClose={externalPress}>
        <TouchableOpacity style={styles.modalOverlay} onPress={externalPress}>
          <View style={styles.contentContainer}>
            <Text style={[styles.headerTextStyle, styles.modalHeader]}>SORT PROJECTS BY</Text>
            {modalOptions.map((option: OptionData, i: number): JSX.Element => {
              return (
                <TouchableOpacity onPress={option.callback} key={i} style={styles.touchableOptionStyle}>
                  <Icon name={option.icon} size={18} color={COLORS.FT_SECONDARY}/>
                  <Text style={[styles.optionTextStyle, {marginLeft: 7}]}>{option.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.FT_PRIMARY,
  },
  touchableOptionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  labelText: {
    fontSize: 16,
  },
  dropdownModal: {},
  modalOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 12
  },
  headerTextStyle: {
    color: COLORS.FT_PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalHeader: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  optionTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.FT_SECONDARY,
  },
});

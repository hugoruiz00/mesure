import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Select = ({data}) => {
    return (
        <SelectDropdown
            data={data}
            defaultValueByIndex={1}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem }
            rowTextForSelection={(item, index) => item }
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={26} color="#7624acce"/>
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
        />
    );
}

const styles = StyleSheet.create({
    dropdownBtnStyle: {
        width: '75%',
        height: 50,
        backgroundColor: '#7624ac09',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#7624acce',
      },
    dropdownBtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
});
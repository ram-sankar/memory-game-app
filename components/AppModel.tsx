import React, { useContext } from "react";
import { View, Modal, StyleSheet } from "react-native";
import ThemeContext from "../common/ThemeContext";
import { KeyValuePairs } from "../constants/modal";

function AppModal({ isModalVisible, children, height, width, ...rest }: Props) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Modal
      visible={isModalVisible}
      {...rest}
    >
      <View style={styles(theme).centeredView}>
        <View style={[styles(theme).modalView, {height: height, width: width}]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = (theme: KeyValuePairs) => StyleSheet.create({
  centeredView: {
    backgroundColor: theme.appBackGround,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: theme.gray1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 20,
    elevation: 5
  }
});

interface Props {
  isModalVisible: boolean,
  children: React.ReactNode, 
  height: number, 
  width: number,
  [rest:string]: any,
}

export default AppModal;

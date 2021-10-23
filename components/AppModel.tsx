import React from "react";
import { View, Modal, StyleSheet } from "react-native";

function AppModal({ isModalVisible, children, height, width, ...rest }: Props) {
  
  return (
    <Modal
      visible={isModalVisible}
      {...rest}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {height: height, width: width}]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    elevation: 5
  },
});

interface Props {
  isModalVisible: boolean,
  children: React.ReactNode, 
  height: number, 
  width: number,
  [rest:string]: any,
}

export default AppModal;

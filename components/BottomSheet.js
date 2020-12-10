import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const BottomSheetScreen = ({ bottomSheetRef, renderInner }) => {
  const fall = new Animated.Value(1);

  const renderHeader = () => {
    return <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[330, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={1}
      callbackNode={fall}
      enabledGestureInteraction={true}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  }
});

export default BottomSheetScreen;

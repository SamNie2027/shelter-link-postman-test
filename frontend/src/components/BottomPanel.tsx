// import * as React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import BottomSheet from 'reanimated-bottom-sheet';
// import ShelterInfoPanel from './ShelterInfoPanel';
//
// const SheltersBottomSheet = () => {
//   const sheetRef = React.useRef<BottomSheet>(null);
//
//   const renderContent = () => (
//     <View style={styles.sheetContent}>
//       <ShelterInfoPanel />
//       <Text style={styles.closeText}>Swipe down to close</Text>
//     </View>
//   );
//
//   const openSheet = () => {
//     if (sheetRef.current) {
//       sheetRef.current.snapTo(0);
//     }
//   };
//
//   return (
//     <>
//       <View style={styles.container}>
//         <Button
//           title="Open Bottom Sheet"
//           onPress={openSheet} // Use the openSheet function
//         />
//       </View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={[450, 300, 0]} // Adjust snap points as needed
//         borderRadius={10}
//         renderContent={renderContent}
//       />
//     </>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sheetContent: {
//     backgroundColor: 'white',
//     padding: 16,
//     height: 450,
//   },
//   closeText: {
//     marginTop: 16,
//     textAlign: 'center',
//   },
// });
//
// export default SheltersBottomSheet;

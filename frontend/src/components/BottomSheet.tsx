// import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   View,
//   FlatList,
//   SafeAreaView, Button
// } from 'react-native';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming
// } from 'react-native-reanimated';
// import ShelterInfoPanel from './ShelterInfoPanel';
// import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
//
// // const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// // const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 260; // Adjusted so it shows most of the sheet
//
// const BottomSheet = forwardRef<BottomSheetMethods, Props>(({ snapTo }: Props, ref) => {
//
//   const bottomSheetRef3 = useRef<BottomSheetMethods>(null);
//
//   const pressHandler3 = useCallback(() => {
//     bottomSheetRef3.current?.expand();
//   }, []);
//
//
//   return (
//       <GestureHandlerRootView style={{flex: 1}}>
//         <SafeAreaView style={styles.container}>
//           <Button title="ScrollView" onPress={() => pressHandler3()} />
//           <BottomSheetScrollView
//             ref={bottomSheetRef3}
//             snapTo={'50%'}
//             backgroundColor={'white'}
//             backDropColor={'black'}>
//           </BottomSheetScrollView>
//         </SafeAreaView>
//       </GestureHandlerRootView>
//   );
// };
//
// export default BottomSheet;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });
// // console.log('BottomSheet is rendering');
// //
// // const translateY = useSharedValue(MAX_TRANSLATE_Y);
// // const context = useSharedValue({ y: 0 });
// //
// // const gesture = Gesture.Pan()
// //   .onStart(() => {
// //     console.log('Gesture started');
// //     context.value = { y: translateY.value };
// //   })
// //   .onUpdate((event) => {
// //     translateY.value = Math.max(
// //       Math.min(event.translationY + context.value.y, 0),
// //       MAX_TRANSLATE_Y
// //     );
// //   });
// //
// // // initial anim when the component loads
// // useEffect(() => {
// //   translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
// //   console.log('sprung up');
// // }, []);
// //
// // // update the content if a shelter is selected
// // useEffect(() => {
// //   if (selectedShelter) {
// //     translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
// //   }
// //   console.log('content change');
// // }, [selectedShelter]);
// //
// // const rBottomSheetStyle = useAnimatedStyle(() => {
// //   const borderRadius = interpolate(
// //     translateY.value,
// //     [MAX_TRANSLATE_Y + 50, 0],
// //     [25, 5],
// //     Extrapolation.CLAMP
// //   );
// //
// //   return {
// //     borderRadius,
// //     transform: [{ translateY: translateY.value }],
// //   };
// // });
// //
// // const renderItem = ({ item }) => (
// //   <ShelterInfoPanel
// //     title={item.title}
// //     description={item.description}
// //     style={styles.shelterInfoPanel}
// //   />
// // );
// //
// // return (
// //   <GestureDetector gesture={gesture}>
// //     <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
// //       <SafeAreaView style={styles.safeArea}>
// //         <View style={styles.line} />
// //         <FlatList
// //           data={selectedShelter ? [selectedShelter] : shelters} // If selected shelter, show just that, else show all
// //           renderItem={renderItem}
// //           keyExtractor={(item) => item.id.toString()}
// //           contentContainerStyle={styles.scrollContainer}
// //           scrollEnabled={true}
// //         />
// //       </SafeAreaView>
// //     </Animated.View>
// //   </GestureDetector>
// // );
// }
// ;
//
// // const styles = StyleSheet.create({
// //   container: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'white',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20
// //   },
// //   lineContainer: {
// //     alignItems: 'center',
// //     marginVertical: 10
// //   },
// //   line: {
// //     width: 50,
// //     height: 4,
// //     backgroundColor: 'grey',
// //     alignSelf: 'center',
// //     marginVertical: 15,
// //     borderRadius: 2
// //   },
// //   scrollContainer: {
// //     paddingBottom: 120
// //   },
// //   safeArea: {
// //     flex: 1
// //   },
// //   shelterInfoPanel: {
// //     marginHorizontal: 29,
// //     marginBottom: 29,
// //     minHeight: 100
// //   }
// // });
// //
// // export default BottomSheet;

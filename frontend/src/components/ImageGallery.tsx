import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { darkMainColor } from '../../constants';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(images.length / 2);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(curr => curr - 1);
    }
  };

  const startIdx = currentPage * 2;
  const currentImages = images.slice(startIdx, startIdx + 2);

  return (
    <View style={styles.galleryContainer}>
      {currentPage > 0 && (
        <TouchableOpacity
          style={[styles.navButton, styles.leftButton]}
          onPress={handlePrev}
        >
          <Text style={styles.navButtonText}>◀</Text>
        </TouchableOpacity>
      )}

      <View style={styles.imagesContainer}>
        {currentImages.map((url, index) => (
          <Image
            key={startIdx + index}
            source={{ uri: url }}
            style={styles.shelterImage}
          />
        ))}
      </View>

      {currentPage < totalPages - 1 && (
        <TouchableOpacity
          style={[styles.navButton, styles.rightButton]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonText}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// // Update the DetailedShelterView to use the new ImageGallery
// export const DetailedShelterView: React.FC<Props> = ({ shelter }) => {
//   // ... previous code remains the same
//
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* ... previous components remain the same */}
//       <View style={styles.images}>
//         <ImageGallery images={shelter.picture} />
//       </View>
//       {/* ... rest of the components remain the same */}
//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
  },
  shelterImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: darkMainColor,
    backgroundColor: '#D9D9D9',
  },
  navButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  leftButton: {
    left: -20,
  },
  rightButton: {
    right: -20,
  },
  navButtonText: {
    color: darkMainColor,
    fontSize: 24,
  },
});
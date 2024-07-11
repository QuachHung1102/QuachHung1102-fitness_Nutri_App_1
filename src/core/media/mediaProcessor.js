import { Platform } from 'react-native';
import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImageManipulator from 'expo-image-manipulator';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'; //Universal Unique Identifier

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`; // Để lưu file cache vào thư mục expo-cache trong thư mục cache của thiết bị

// Checks if given directory exists. If not, creates it
async function ensureDirExists(givenDir) {
  const dirInfo = await FileSystem.getInfoAsync(givenDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(givenDir, { intermediates: true })
  };
};

// Hàm này để lấy thông tin file trong cache dựa vào uri của file đó và trả về path, exists, tmpPath của file
export const downloadFile = async (file, fileName) => {
  try {
    // ensureDirExists là hàm kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo mới
    await ensureDirExists(BASE_DIR);
    const fileUri = `${BASE_DIR}${fileName}`;
    const info = await FileSystem.getInfoAsync(fileUri);
    const { exists, uri } = info;

    if (exists) {
      return { uri };
    };

    // Tạo biến downloadResumable để tải file từ uri và lưu vào fileUri
    const downloadResumable = FileSystem.createDownloadResumable(file, fileUri);
    // Tải file và trả về uri của file
    return downloadResumable.downloadAsync();
  } catch (error) {
    return { uri: null };
  };
};


const resizeImage = async ({ image }, callback) => {
  const imagePath = image?.path || image?.uri;

  ImageManipulator.manipulateAsync(imagePath, [], {
    compress: 0.7,
    format: ImageManipulator.SaveFormat.JPEG,
  })
    .then(newSource => {
      if (newSource) {
        callback(newSource.uri)
      }
    })
    .catch(err => {
      callback(imagePath)
    })
};

/**
 * This function takes a media file object as the first argument and callback function as the second argument.
 * The media file object can either be a photo object or a video object.
 * If the media file is a photo object, this function resizes the photo and calls the callback function with an object of a processed uri.
 * If the media file is a video object, this function compresses the video file and creates a thumbnail from the compressed file. Then
 * calls the callback function with an object of a processed uri and thumbnail uri.
 * @param {object} file
 * @param {function} callback
 */
export const processMediaFile = (file, callback) => {
  const { type, uri, path } = file;
  const fileSource = uri || path;


  const includesImage = type?.includes('image');
  if (includesImage) {
    resizeImage({ image: file }, processedUri => {
      callback({ processedUri })
    })
    return;
  }
  callback({ processedUri: fileSource });
};


import React, { useCallback, useEffect, useState, useRef } from "react";
import { Platform, Animated, Easing, StyleSheet, ViewProps } from "react-native";
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { CameraRoll, PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import ShimmerView from "./ShimmerView";


export const CameraRollWrapper = () => {

  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State này để xác định xem ảnh đang được fetch hay không

  const openSettingsAlert = useCallback(({ title }) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Open Settings',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Cancel',
        onPress: () => { },
      },
    ]);
  }, []);
  /**
   * Hàm này để tạo thông cảnh báo truy cập device settings để cấp quyền cho App.
   * Nếu người dùng chọn mở settings, hàm sẽ mở settings của device.
   * Nếu người dùng chọn cancel, hàm sẽ không làm gì cả.
   * Ở đây sử dụng useCallback để tránh việc tạo ra hàm mới mỗi khi render.
   */

  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version.toString(), 10) >= 33) {
      const permissions = await Permissions.checkMultiple([ // checkMultiple để kiểm tra một lúc nhiều trạng thái quyền
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      // Nếu quyền truy cập ảnh và video đã được cấp, setHasPermission(true) và return
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
        Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
        Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }

      // Tạo biến res để lưu trạng thái quyền sau khi yêu cầu
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      // Nếu quyền đã được cấp từ trước, setHasPermission(true)
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
        Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
        Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      // Nếu quyền bị từ chối, yêu cầu lại quyền
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
        Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      // Nếu quyền bị chặn, hiển thị thông báo yêu cầu mở settings
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
        Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
        Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        });
      }
    } else {
      // Nếu phiên bản Android < 10, sử dụng quyền cũ để kiểm tra quyền
      // Kiểm tra quyền truy cập vào bộ nhớ ngoài
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      // Nếu quyền đã được cấp, setHasPermission(true) và return
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      // Tạo một biến res để lưu trạng thái quyền sau khi yêu cầu
      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      // Nếu quyền đã được cấp, setHasPermission(true)
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      // Nếu quyền bị từ chối, yêu cầu lại quyền
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      // Nếu quyền bị chặn, hiển thị thông báo yêu cầu mở settings
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);

  // Hàm này để kiểm tra quyền truy cập vào thư viện của thiết bị IOS và Android
  const checkPermission = useCallback(async () => {
    // Nếu là IOS
    if (Platform.OS === 'ios') {
      // Kiểm tra quyền truy cập vào thư viện ảnh
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED) {
        setHasPermission(true);
        return;
      }
      // Tạo biến res để lưu trạng thái quyền sau khi yêu cầu
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED) {
        setHasPermission(true);
      }
      // Nếu quyền bị khóa, hiển thị thông báo yêu cầu mở settings
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
      // Nếu là Android
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  // Kiểm tra quyền truy cập vào thư viện của thiết bị khi component được render
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  // Hàm này để fetch ảnh từ thư viện của thiết bị
  const fetchPhotos = useCallback(async () => {
    const res = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });
    setPhotos(res?.edges);
    setIsLoading(false); // đặt trạng thái về false khi ảnh đang được tìm nạp
  }, []);
  // Fetch ảnh khi quyền truy cập được cấp
  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
    }
  }, [hasPermission, fetchPhotos]);

  return (
    <FlatList
      numColumns={3}
      data={isLoading ? Array(15).fill('') : photos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        if (isLoading) {
          return (
            <ShimmerView key={index} delay={index * 100} width={'33%'} />
          );
        }
        return (
          <Image
            key={item?.node?.image?.uri}
            source={{ uri: item?.node?.image?.uri }}
            height={140}
            style={styles.image}
          />
        );
      }}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
});
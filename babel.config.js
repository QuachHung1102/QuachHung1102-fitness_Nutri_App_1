module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', 'module:metro-react-native-babel-preset'],
  plugins: [
    // Sử dụng cú pháp mới cho decorators theo đề xuất mới nhất nếu ứng dụng của bạn có thể hỗ trợ
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    // Plugin này vẫn giữ nguyên vì nó hỗ trợ cú pháp tiện ích
    '@babel/plugin-proposal-optional-catch-binding',
    // Đảm bảo rằng bạn đang sử dụng phiên bản mới nhất của plugin cho react-native-reanimated
    'react-native-reanimated/plugin',
    // Các plugin mới có thể hỗ trợ cải thiện hiệu suất hoặc tương thích
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    production: {
      plugins: [
        'transform-remove-console',
        // Có thể thêm các plugin tối ưu hóa khác cho môi trường sản xuất
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
};
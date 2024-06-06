const bodyImage1 = require('../assets/images/questionImages/body1.png');
const bodyImage2 = require('../assets/images/questionImages/body2.png');
const bodyImage3 = require('../assets/images/questionImages/body3.png');
const bodyImage4 = require('../assets/images/questionImages/body4.png');
const bodyImage5 = require('../assets/images/questionImages/body5.png');

export const QuestionData = [
  {
    type: 'button', // 'button' or 'input'
    question: 'Mục đích của bạn là:',
    answers: [
      {
        id: '1',
        answer: 'Tăng cân',
      },
      {
        id: '2',
        answer: 'Giảm cân',
      },
      {
        id: '3',
        answer: 'Giữ dáng',
      },
      {
        id: '4',
        answer: 'Khỏe mạnh',
      },
    ],
  },
  {
    type: 'button',
    question: 'Giới tính của bạn là:',
    answers: [
      {
        id: '1',
        answer: 'Nam',
      },
      {
        id: '2',
        answer: 'Nữ',
      },
    ],
  },
  {
    type: 'input',
    question: 'Tuổi của bạn là:',
    answers: [
      {
        id: 'i1',
        unit: 'tuổi',
      },
    ],
  },
  {
    type: 'input',
    question: 'Chiều cao của bạn là:',
    answers: [
      {
        id: 'i2',
        unit: 'cm',
      },
    ],
  },
  {
    type: 'input',
    question: 'Cân nặng hiện tại:',
    answers: [
      {
        id: 'i3',
        unit: 'kg',
      },
    ],
  },
  {
    type: 'input',
    question: 'Cân nặng mục tiêu:',
    answers: [
      {
        id: 'i4',
        unit: 'kg',
      },
    ],
  },
  {
    type: 'select',
    question: 'Hình dáng cơ thể:',
    answers: [
      {
        id: '1',
        answer: 'Quả lê',
        bodyImage: bodyImage1,
      },
      {
        id: '2',
        answer: 'Tam giác ngược',
        bodyImage: bodyImage2,
      },
      {
        id: '3',
        answer: 'Quả chuối',
        bodyImage: bodyImage3,
      },
      {
        id: '4',
        answer: 'Quả táo',
        bodyImage: bodyImage4,
      },
      {
        id: '5',
        answer: 'Đồng hồ cát',
        bodyImage: bodyImage5,
      },
    ],
  },
  {
    type: 'form',
    question: 'Nguyên liệu dị ứng:',
    answers: [{id: '1'}],
  },
  {
    type: 'button',
    question: 'Thời gian đạt được mục tiêu:',
    answers: [
      {
        id: '1',
        answer: '2 tháng',
      },
      {
        id: '2',
        answer: '3 tháng',
      },
      {
        id: '3',
        answer: '4 tháng',
      },
      {
        id: '4',
        answer: '6 tháng',
      },
      {
        id: '5',
        answer: '12 tháng',
      },
    ],
  },
];

export const allergiesList = [
  'sữa bò',
  'trứng',
  'quả hạch',
  'đậu phộng',
  'lúa mì',
  'đậu nành',
  'cá',
];

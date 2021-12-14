export const lines = [
  {
    id: '1',
    name: 'Борщагівська лінія швидкісного трамваю',
    prefix: 'БЛШТ',
  },
  {
    id: '2',
    name: 'Троєщинська лінія швидкісного трамваю',
    prefix: 'ТЛШТ',
  },
  {
    id: '3',
    name: 'Міська електричка',
    prefix: 'СМЕ',
  },
  {
    id: '4',
    name: 'Київпастранс',
    prefix: 'КПТ',
  },
];

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
function formattedValue(value: string) {
  let newValue = value.split('_')[0];

  lines.map((val) => {
    newValue = newValue === val.prefix ? val.name : newValue;
  });

  return newValue;
}

export default formattedValue;

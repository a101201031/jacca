export function scoreToText(v: number) {
  switch (v) {
    case 1:
      return '매우 불만족해요.';
    case 2:
      return '조금 불만족해요.';
    case 3:
      return '나쁘지 않아요.';
    case 4:
      return '만족해요.';
    case 5:
      return '최고에요.';
  }
}

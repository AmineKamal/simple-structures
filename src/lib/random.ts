export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function any<T>(arr: T[]) {
  return arr[rand(0, arr.length)];
}

// Durstenfeld shuffle
export function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

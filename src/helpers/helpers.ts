export const BASE_URL = 'https://api.genshin.dev';

export const capitalLetter = (str: string) => {
  const newStr = str.split(" ");
  for (let i = 0; i < newStr.length; i++) {
    newStr[i] = newStr[i][0].toUpperCase() + newStr[i].substr(1);
  }
  return newStr.join(" ");
};

export const archon = ['Venti', 'Zhongli', 'Raiden Shogun', 'Nahida'];
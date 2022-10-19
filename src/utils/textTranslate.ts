export const textTranslate = (lang: string, string1: string, string2: string) => {
  if (lang === 'en-US') {
    return string1;
  }
  return string2;
};

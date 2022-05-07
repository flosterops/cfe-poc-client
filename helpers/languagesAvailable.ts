export const LANGUAGES = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    pt: 'Portuguese',
    ru: 'Russian',
    it: 'Italian',
    pl: 'Polish',
    default: 'English',
};

type langType = 'en' | 'de' | 'fr' | 'es' | 'pt' | 'ru' | 'it' | 'pl';

export function getLangByKey(lang: langType): string {
    if (LANGUAGES[lang]) {
        return LANGUAGES[lang];
    }
    return LANGUAGES['default'];
}

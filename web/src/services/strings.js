import diacritics from "diacritics";

export function clean(text) {
    return diacritics.remove(text.toLowerCase());
}
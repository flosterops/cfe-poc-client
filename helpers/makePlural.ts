interface PluralRules {
    single: string;
    plural: string;
}

// TODO need to check is it possible to use third party solution, if not we'll need to check are all supported languages have only two forms
export function makePlural(num: number, rules: PluralRules): string {
    if (num === 1) {
        return rules.single;
    } else {
        return rules.plural;
    }
}

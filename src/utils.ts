export const calculateAge = (birth_year: string) => {
    if (birth_year === 'unknown') return 'unknown';
    if (birth_year.includes('BBY')) {
        const year = +birth_year.replace('BBY', '');
        return 35 + year;
    } else {
        const year = +birth_year.replace('ABY', '');
        return 35 - year;
    }
};
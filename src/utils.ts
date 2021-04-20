import { filmType } from './actions/appActionTypes'

export const mapFilms: (characterFilms: string[], films: filmType[]) => string[] = (characterFilms, films) => {


    const titles: string[] = []
    characterFilms.forEach((filmUrl: string) => {
        films.forEach((film: filmType) => {
            const id = +filmUrl.split('/')[5]
            if (id === film.id) {
                titles.push(film.title)
            }
        })
    })
    return titles
}

export const calculateAge = (birth_year: string) => {
    if (birth_year === 'unknown') return 'unknown';
    if (birth_year.includes('BBY')) {
        const year = +birth_year.replace('BBY', '');
        return 35 + year;
    } else {
        const year = +birth_year.replace('ABY', '');
        return 35 - year;
    }
}
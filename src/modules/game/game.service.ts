import type { LetterResultType } from '../../graphql/generated';
import type { IDifferenceLetters } from './game.interfaces';

export const getDifferenceBetweenWords = (
    guessedWord: string,
    receivedWord: string
): IDifferenceLetters => {
    const splitReceivedWord = receivedWord.split('');
    const splitGuessedWord = guessedWord.split('');
    const result: IDifferenceLetters = {};

    for (let i = 0; i < splitGuessedWord.length; i++) {
        const nameIndex = `letter_${i + 1}`;
        if (splitGuessedWord[i] === splitReceivedWord[i]) {
            result[nameIndex] = 'CORRECT' as LetterResultType;
        } else if (splitGuessedWord.includes(splitReceivedWord[i])) {
            result[nameIndex] = 'OTHER_PLACE' as LetterResultType;
        } else {
            result[nameIndex] = 'INCORRECT' as LetterResultType;
        }
    }

    return result;
};

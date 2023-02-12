export interface IDifferenceLetters {
    [key: string]: string;
}

export interface IPayloadEnteredWord {
    enteredWord: {
        usersId: number[];
        round: number;
    };
}

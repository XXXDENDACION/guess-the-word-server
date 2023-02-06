export interface IGameInput {
    game: UserIds;
}

export interface IGameEnterWord {
    word: string;
    gameId: number;
    round: number;
}

export interface IDifferenceLetters {
    [key: string]: string;
}

type UserIds = {
    usersId: number[];
};

export interface IPayloadEnteredWord {
    enteredWord: {
        usersId: number[];
        round: number;
    };
}

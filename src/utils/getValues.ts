import Game from "../Model/Game";

const getKeyValueArr = (arr, key): Array<{ id: string; value: number }> =>
    arr.map(ele => ({ id: ele.id, value: ele[key] }));

const getUserGame = (id: string, games: Game[]) => {
    return games.find(game => game.users.find(user => user.id === id));
};
export { getKeyValueArr, getUserGame };

import Player from "../interface/Player.interface";
import { getKeyValueArr } from "../utils/getValues";

export default class PlayService {
    constructor() {}

    private getEqualityCondition(key: string) {
        let equality = true;
        if (key === "economy" || key === "bowlAverage") equality = false;
        return equality;
    }

    public compare(each_user_card: Player[], key: string) {
        // Returns whether the winner should have max or min value
        const greater = this.getEqualityCondition(key);

        // return the array of specific key from given object
        const values = getKeyValueArr(each_user_card, key);

        return this.getMaxValue(values, greater);
    }

    private getMaxValue(
        elements: Array<{ id: string; value: number }>,
        isGreater: boolean
    ) {
        let winner = elements[0].id;
        let maxVal = elements[0].value;
        elements.forEach(element => {
            if (isGreater) {
                if (maxVal < element.value) {
                    winner = element.id;
                    maxVal = element.value;
                }
            } else {
                if (maxVal > element.value) {
                    winner = element.id;
                    maxVal = element.value;
                }
            }
        });
        return winner;
    }
}

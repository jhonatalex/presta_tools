export class ListHandler {

    constructor() { }

    /**
     * this method sorts a list of objects by an attribute
     * @array arrays of object
     * @string name of the object's attribute
     */
    sortByAttribute<E extends Record<string, any>>(array: Array<E>, attributeName: string): Array<E> {
        array.sort((a, b) => {
            if (a[attributeName] < b[attributeName]) return -1;
            else if (a[attributeName] > b[attributeName]) return 1;
            else return 0;
        });
        return array;
    }

    sortByAttributeDesc<E extends Record<string, any>>(array: Array<E>, attributeName: string): Array<E> {
        array.sort((a, b) => {
            if (a[attributeName] > b[attributeName]) return -1;
            else if (a[attributeName] < b[attributeName]) return 1;
            else return 0;
        });
        return array;
    }

    sortByAttributeSecondCap<E extends Record<string, any>>(array: Array<E>, second: string, attributeName: string): Array<E> {
        array.sort((a, b) => {
            if (a[second][attributeName] < b[second][attributeName]) return -1;
            else if (a[second][attributeName] > b[second][attributeName]) return 1;
            else return 0;
        });
        return array;
    }

}

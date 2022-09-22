export declare class RouletteNumber {
    number: number;
    color: string;
    row: number;
    column: number;
    doubleColumns: any[];
    isOdd: boolean;
    lessThanEighteen: boolean;
    dozen: number;
    doubles: any[];
    quarters: any[];
    constructor(number: number, color: string, row: number, column: number, doubleColumns: any[], isOdd: boolean, lessThanEighteen: boolean, dozen: number, doubles: any[], quarters: any[]);
}
declare const rouletteNumbers: RouletteNumber[];
export { rouletteNumbers };

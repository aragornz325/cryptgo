"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandValue = void 0;
const getHandValue = (hand) => {
    let value = 0;
    let hasAce = false;
    try {
        hand.map((card) => {
            let cardValue = card.value;
            if (cardValue === 1) {
                hasAce = true;
            }
            value += cardValue;
        });
    }
    catch (e) {
        console.log(e);
    }
    if (hasAce && value + 10 <= 21) {
        value += 10;
    }
    return value;
};
exports.getHandValue = getHandValue;
//# sourceMappingURL=hand-value.function.js.map
export type CardMeta = {
    name: string;
    image: string;
};

export const CARD_DATABASE: Record<string, CardMeta> = {
    1: {
        name: "Pikachu Standard",
        image: "/cards/1.jpg"
    },
    2: {
        name: "Pikachu VMAX",
        image: "/cards/2.jpg"
    }
}

export function getCardMeta(id: number): CardMeta {
    return CARD_DATABASE[id] || CARD_DATABASE[0];
}
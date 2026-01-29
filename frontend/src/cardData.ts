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
    },
    3: {
        name: "Charizard Standard",
        image: "https://placehold.co/400x560/2a2a2a/ffffff?text=Charizard+Std"
    },
    4: {
        name: "Charizard VMAX",
        image: "https://placehold.co/400x560/3a1a1a/ffffff?text=Charizard+VMAX"
    },
    5: {
        name: "Umbreon VMAX",
        image: "https://placehold.co/400x560/1a1a3a/ffffff?text=Umbreon+VMAX"
    },
    6: {
        name: "Slowpoke Standard",
        image: "https://placehold.co/400x560/4a2a4a/ffffff?text=Slowpoke"
    },
    7: {
        name: "Greninja EX",
        image: "https://placehold.co/400x560/1a3a4a/ffffff?text=Greninja+EX"
    },
    8: {
        name: "Alakazam Rev. Holo",
        image: "https://placehold.co/400x560/3a2a1a/ffffff?text=Alakazam"
    },
    9: {
        name: "Zekrom EX",
        image: "https://placehold.co/400x560/1a1a1a/ffffff?text=Zekrom+EX"
    },
    10: {
        name: "Rattata Standard",
        image: "https://placehold.co/400x560/2a2a2a/ffffff?text=Rattata"
    },
    0: {
        name: "Unbekannte Karte",
        image: "https://placehold.co/400x560/000000/ffffff?text=Unknown"
    }
}

export function getCardMeta(id: number): CardMeta {
    return CARD_DATABASE[id] || CARD_DATABASE[0];
}
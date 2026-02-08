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
        image: "https://m.media-amazon.com/images/I/71koeN14KlL._AC_UF894,1000_QL80_.jpg"
    },
    4: {
        name: "Charizard VMAX",
        image: "https://m.media-amazon.com/images/I/71tzsQnL8uL.jpg"
    },
    5: {
        name: "Umbreon VMAX",
        image: "https://www.pokekarty.pl/wp-content/uploads/2024/09/215_5221818a-2347-498e-9294-e503dac9272b.png"
    },
    6: {
        name: "Slowpoke Standard",
        image: "https://pokesingle.pl/userdata/public/gfx/5120/6ca126fb68fccd82272ca34fd5f383a0.png"
    },
    7: {
        name: "Greninja EX",
        image: "https://pokesingle.pl/userdata/public/gfx/5697/54.jpg"
    },
    8: {
        name: "Alakazam Rev. Holo",
        image: "https://www.pokekarty.pl/wp-content/uploads/2024/09/1807680.jpg"
    },
    9: {
        name: "Zekrom EX",
        image: "https://tcgplayer-cdn.tcgplayer.com/product/642618_in_1000x1000.jpg"
    },
    10: {
        name: "Rattata Standard",
        image: "https://pocket.pokemongohub.net/tcg-pocket/cards/a1/webp/cPK_10_001890_00_KORATTA_C_M_M_en_US.webp"
    },
    11: {
        name: "Emolga Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Black+Bolt/112.webp",
    },
    12: {
        name: "Ludicolo Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Detective+Pikachu/2.webp",
    },
    13: {
        name: "Slugma Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Fusion+Strike/034.webp",
    },
    14: {
        name: "Torchic Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Dark+Explorers/14.webp",
    },
    15: {
        name: "Simsear Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Next+Destinies/16.webp",
    },
    16: {
        name: "Swadloon Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Plasma+Storm/9.webp",
    },
    17: {
        name: "Whimsicott EX",
        image: "https://pokemoncardimages.pokedata.io/images/White+Flare/165.webp",
    },
    18: {
        name: "Litwick Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Phantom+Forces/41.webp",
    },
    19: {
        name: "Joltik Standard",
        image: "https://pokemoncardimages.pokedata.io/images/Stellar+Crown/050.webp",
    },
    20: {
        name: "Herdier Standard",
        image: "https://pokemoncardimages.pokedata.io/images/White+Flare/155.webp",
    },
    0: {
        name: "Unbekannte Karte",
        image: "https://www.mypokecard.com/en/Gallery/my/galery/dtTXXVw1kGvv.jpg"
    }
}

export function getCardMeta(id: number): CardMeta {
    return CARD_DATABASE[id] || CARD_DATABASE[0];
}
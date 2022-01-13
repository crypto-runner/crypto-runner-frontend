
import Img1 from "src/assets/gifs/presale/CzFinance_1.gif";
import Img2 from "src/assets/gifs/presale/CzFinance_2.gif";
import Img3 from "src/assets/gifs/presale/Elonmusk_3.gif";
import Img4 from "src/assets/gifs/presale/Elonmusk_4.gif";
import Img5 from "src/assets/gifs/presale/Jack_5.gif";
import Img6 from "src/assets/gifs/presale/Jack_6.gif";
import Img7 from "src/assets/gifs/presale/Jill_7.gif";
import Img8 from "src/assets/gifs/presale/Jill_8.gif";
import Img9 from "src/assets/gifs/presale/JustinSun_9.gif";
import Img10 from "src/assets/gifs/presale/JustinSun_10.gif";
import Img11 from "src/assets/gifs/presale/Michelle_11.gif";
import Img12 from "src/assets/gifs/presale/Michelle_12.gif";
import Img13 from "src/assets/gifs/presale/SamBankMan_13.gif";
import Img14 from "src/assets/gifs/presale/SamBankMan_14.gif";


export const RUNNERS = [
    { tokenId: 0, maxAvailable: 2000, image: Img1, name: "CzFinance", description: null },
    { tokenId: 1, maxAvailable: 1000, image: Img2, name: "CzFinance", description: null },
    { tokenId: 2, maxAvailable: 700, image: Img3, name: "ELONMASK", description: null },
    { tokenId: 3, maxAvailable: 350, image: Img4, name: "ELONMASK", description: null },
    { tokenId: 4, maxAvailable: 200, image: Img5, name: "JACK", description: null },
    { tokenId: 5, maxAvailable: 100, image: Img6, name: "JACK", description: null },
    { tokenId: 6, maxAvailable: 200, image: Img7, name: "JILL", description: null },
    { tokenId: 7, maxAvailable: 100, image: Img8, name: "JILL", description: null },
    { tokenId: 8, maxAvailable: 200, image: Img9, name: "JUSTINSUN", description: null },
    { tokenId: 9, maxAvailable: 100, image: Img10, name: "JUSTINSUN", description: null },
    { tokenId: 10, maxAvailable: 200, image: Img11, name: "MICHELLE", description: null },
    { tokenId: 11, maxAvailable: 100, image: Img12, name: "MICHELLE", description: null },
    { tokenId: 12, maxAvailable: 200, image: Img13, name: "SAMBACKMAN", description: null },
    { tokenId: 13, maxAvailable: 100, image: Img14, name: "SAMBACKMAN", description: null },
]

export const getRunner = (id: any) => {
    return RUNNERS.find((e) => e.tokenId === parseInt(id))
}
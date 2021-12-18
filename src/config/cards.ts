
import Img1 from "src/assets/gifs/presale/Jack_23122.gif";
import Img2 from "src/assets/gifs/presale/Jack_23132.gif";
import Img3 from "src/assets/gifs/presale/Jack_23211.gif";
import Img4 from "src/assets/gifs/presale/Jack_23212.gif";
import Img5 from "src/assets/gifs/presale/Jack_23222.gif";
import Img6 from "src/assets/gifs/presale/Jack_23231.gif";


export const LANDS = [
    { tokenId: 0, maxAvailable: 2000, image: Img1, name: "CROIYAMA", description: null },
    { tokenId: 1, maxAvailable: 1000, image: Img2, name: "SLYN", description: null },
    { tokenId: 2, maxAvailable: 700, image: Img3, name: "THEPADUS", description: null },
    { tokenId: 3, maxAvailable: 350, image: Img4, name: "TERETH", description: null },
    { tokenId: 4, maxAvailable: 200, image: Img5, name: "KALDIR", description: null },
    { tokenId: 5, maxAvailable: 100, image: Img6, name: "CRATER", description: null },
]

export const getLand = (id:any) => {
    return LANDS.find((e) => e.tokenId === id)
}
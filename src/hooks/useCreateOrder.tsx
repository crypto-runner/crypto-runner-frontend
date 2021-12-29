import { Order, useSellOrder } from "@nftvillage/marketplace-sdk";
import { useWalletProvider } from "@react-dapp/wallet";
import { useDispatch } from "react-redux";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { setUserLoading } from "src/redux/user/userReducer";
import { CreateFixPriceOrderParams } from "src/types/userTypes";

const useCreateOrder = (asset: string) => {
  const { account } = useWalletProvider();
  const { create, approve, isApproved } = useSellOrder(asset);
  const dispatch = useDispatch();

  const createFixPriceOrder = async ({
    assetId,
    price,
    name,
  }: CreateFixPriceOrderParams) => {
    dispatch(setUserLoading(true));
    let ord: Order = {
      order: {
        asset,
        assetId: Number(assetId),
        maker: account || "",
        side: 0,
        assetType: 1,
        saleKind: 0,
        basePrice: price.toString(),
      },
      metadata: {
        name,
        attributes: [],
        price: Number(price),
        address: POOL_CARD_ADDRESS,
        tokenId: Number(assetId),
        collectionName: "crypto-runner",
        makerAddress: account || "",
      },
    };

    if (!isApproved) {
      let res = await approve();
      if (!res) return;
    }
    let res = await create(ord);
    console.log(res);
    dispatch(setUserLoading(false));
    window.location.reload();
  };

  return { createFixPriceOrder, isApproved };
};

export default useCreateOrder;

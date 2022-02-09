import { AssetType, Order, OrderSide, SaleKind, useSellOrder } from "@nftvillage/marketplace-sdk";
import { useWalletProvider } from "@react-dapp/wallet";
import { useDispatch } from "react-redux";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { setUserLoading } from "src/redux/user/userReducer";
import { CreateFixPriceOrderParams } from "src/types/userTypes";
import useLoading from "./useLoading";

const useCreateOrder = (asset: string) => {
  const { account } = useWalletProvider();
  const { create, isApproved, approve } = useSellOrder(asset);
  const dispatch = useDispatch();
  const { startLoading, stopLoading } = useLoading();

  const createERC1155Order = async ({
    metadata,
    assetAmount,
    tokenId,
    price,
  }: {
    metadata: any;
    assetAmount: number;
    tokenId: number;
    price: number;
  }) => {
    startLoading();
    let ord: Order = {
      order: {
        asset,
        assetId: tokenId,
        maker: account || "",
        side: OrderSide.SELL,
        assetType: AssetType.ERC1155,
        saleKind: SaleKind.BUYNOW,
        basePrice: price.toString(),
        assetAmount,
      },
      metadata: {
        ...metadata,
        collectionName: "crypto-runner",
        makerAddress: account || "",
      },
    };
    if (!isApproved) {
      let res = await approve();
      if (!res) return;
    }
    let res = await create(ord);
    stopLoading();
    if (res?.status) window.location.reload();
    return res;
  };

  return { createERC1155Order, isApproved };
};

export default useCreateOrder;

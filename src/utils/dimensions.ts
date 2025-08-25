export const TRANSFER_ITEM_HEIGHT = 100;
export const TRANSFER_ITEM_SEPARATOR = 12;
export const TRANSFER_HEADER_HEIGHT = 40;

export const getTransferItemLayout = (_: any, index: number) => ({
  length: TRANSFER_ITEM_HEIGHT + TRANSFER_ITEM_SEPARATOR,
  offset: (TRANSFER_ITEM_HEIGHT + TRANSFER_ITEM_SEPARATOR) * index,
  index,
});

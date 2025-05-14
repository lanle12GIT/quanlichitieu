export enum OrderStatus {
  DAT_HANG = "DAT HANG",
  HUY = "HUY",
  DA_THANH_TOAN = "DA THANH TOAN",
  DANG_GIAO = "DANG GIAO",
  DA_GIAO = "DA GIAO"
}

export interface Order {
    id?: string;
    name?: string;
    phone?: string;
    address?: string;
    money?: number;
    note?: string;
    status?: OrderStatus; // Changed to use the enum
    createdAt?: Date;
}
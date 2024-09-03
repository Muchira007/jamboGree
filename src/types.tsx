// types.ts

export interface Product {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  Color: string;
  ImageData: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface ProductResponse {
  products: Product[]; // Corrected the key from 'posts' to 'products'
}

export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  NationalID: number;
  Email: string;
  FirstName: string;
  SecondName: string;
  SurName: string;
  PhoneNum: string;
  Password: string;
  ResetToken: string;
  ResetTokenExpiry: string;
}

export interface UserResponse {
  users: User[];
}

export interface Sales {
  ID: number;
  CreatedAt: string;
  Customer: {
    ID: number;
    Name: string;
    PhoneNumber: string;
    NationalID: string;
    Country: string;
    County: string;
    Subcounty: string;
    Village: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
  };
  CustomerID: number;
  DateOfSale: string;
  DeletedAt: string | null;
  Latitude: number;
  Longitude: number;
  NationalID: string;
  PaymentOption: string;
  Product: {
    ID: number;
    Name: string;
    Description: string;
    Price: number;
    Color: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
  };
  ProductID: number;
  Quantity: number;
  SerialNumber: string;
  StatusOfAccount: string;
  Total: number;
  UpdatedAt: string;
}

export interface SalesResponse {
  sales: Sales[];
}

export interface Customer {
  ID: number;
  Name: string;
  PhoneNumber: string;
  Country: string;
  County: string;
  Subcounty: string;
  Village: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CustomerResponse {
  customers: Customer[];
}

// Define Sale and other types
export interface Sale {
  name: string;
  date_of_sale: string;
  gender: string;
  phone_number: string;
  customer_id: number;
  latitude: number;
  longitude: number;
  country: string;
  county: string;
  subcounty: string;
  village: string;
  product_name: string;
  serial_number: string;
  payment_option: string;
  status_of_account: string;
  quantity: number;
  national_id: number;
}

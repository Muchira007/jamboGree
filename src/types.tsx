// types.ts
export interface Product {
  ID: number;          // Product ID
  Name: string;        // Product name
  Description: string; // Product description
  Price: number;       // Product price
  Quantity: number;    // Product quantity
  Color: string;       // Product color
  ImageData: string | null;  // Image data URL or null if not provided
  CreatedAt: string;   // Product creation date
  UpdatedAt: string;   // Product update date
  DeletedAt: string | null; // Product deletion date or null if not deleted
}

export interface ProductResponse {
  posts: Product[]; // Array of Product objects
}

  // Define the User interface
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

// Define the response structure for fetching all users
export interface UserResponse {
  users: User[];
}

// Define the Sale interface
export interface Sale {
  name: string;
  date_of_sale: string;
  gender: string;
  phone_number: string;
  customer_id: number;
  latitude: number;  // Added latitude
  longitude: number; // Added longitude
  country: string;
  county: string;
  subcounty: string;
  village: string;
  product_id: number;
  serial_number: string;
  payment_option: string;
  status_of_account: string;
  quantity: number;
  // NationalID:  number;
}

// Define the response structure for fetching sales
export interface SaleResponse {
  sales: Sale[];
}
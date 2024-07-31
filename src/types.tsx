// types.ts
export interface Product {
  id?: string;          // Product ID, optional if not provided
  name: string;        // Product name (previously 'title')
  description: string; // Product description (you might have this field in your backend)
  price: number;       // Product price
  quantity: number;    // Product quantity (previously 'inStock', you may want to adjust this based on your backend)
  color: string;       // Product color
  imageData?: string;  // Base64 encoded image data (optional)
  createdAt?: string;  // Product creation date (optional if provided by backend)
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

  
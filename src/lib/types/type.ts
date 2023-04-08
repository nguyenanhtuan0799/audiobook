export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  name: string;
  slug: string;
}

export interface Product {
  categoryRef: {
    name: string;
    slug: string;
    createAt: string;
  };
  imagePreview: string[];
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  salePrice: number;
  freeShip: number;
  description: string;
  quantity: number;
  totalPrice: number;
  priceShip: number;
  view: number;
  createAt: string;
}

export interface User {
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
}

export interface NewsProps {
  content: string;
  createAt: string;
  image: string;
  title: string;
  author: string;
  id: string;
  shortDescription: string;
}

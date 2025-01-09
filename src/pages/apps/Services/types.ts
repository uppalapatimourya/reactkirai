export interface Service {
  id?: number;
  tenantId?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  reviews: number;
  rating: number;
  imageUrl: string;
}
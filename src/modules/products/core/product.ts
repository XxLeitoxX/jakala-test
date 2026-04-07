export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isNew: boolean;
  binomialName?: string;
  wateringsPerWeek?: number;
  fertilizerType?: string;
}


export interface ApiResponse {
  status: string;
  data: {
    filtered_count: number;
    qualifying_count: number;
    vehicles: Vehicle[];
  };
}

export interface Vehicle {
  id: string;
  body_style: string;
  categories: string[];
  image: string;
  details_image: string;
  make: string;
  mileage: number;
  model: string;
  model_year: string;
  new_used_flag: string;
  product_financials: ProductFinancial[];
  trim: string;
}

export interface ProductFinancial {
  monthly_payment_cents: number;
  start_fee_cents: number;
}

export interface HomeProps {
  cars: Vehicle[];
}

export interface DetailsData {
  vehicle: Vehicle;
}

export interface DetailsResponse {
  status: string;
  data: DetailsData;
}

export interface Column {
  id: string;
  label: string;
  align?: "right";
}

export interface EmpUpdateValues {
  title: string;
  availabilityStatus: string;
  price: string;
  rating: string;
  category: string;
  id: string | number;
}

export interface PageControl {
  page: number;
  rowsPerPage: number;
}
export interface EmployeesState {
  employeesList: {
    products: any[];
    total: number;
    skip: number;
    limit: number;
  };
  loading?: boolean;
  error: string | null;
}

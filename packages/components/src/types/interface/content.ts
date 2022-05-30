export interface RVContentDate {
  month?: RVMonths;
  quarter?: string;
}

export interface RVMonths {
  jan?: string;
  feb?: string;
  mar?: string;
  apr?: string;
  may?: string;
  jun?: string;
  jul?: string;
  aug?: string;
  sep?: string;
  oct?: string;
  nov?: string;
  dec?: string;
}

export interface RVContentLabel {
  date?: string;
}

export interface RVContent {
  title?: string;
  date?: RVContentDate;
  label?: RVContentLabel;
}

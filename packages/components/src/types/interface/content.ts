export interface RVContentDate {
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
  month?: string;
  quarter?: string;
}

export interface RVContentLabel {
  date?: string;
}

export interface RVContent {
  title?: string;
  date?: RVContentDate;
  label?: RVContentLabel;
}

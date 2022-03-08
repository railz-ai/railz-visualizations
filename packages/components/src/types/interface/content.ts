export interface RVContentDate {
  month?: string;
  quarter?: string;
}

export interface RVContentLabel {
  date?: string;
}

export interface RVContent {
  date?: RVContentDate;
  label?: RVContentLabel;
}

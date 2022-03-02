export interface RVContentDate {
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

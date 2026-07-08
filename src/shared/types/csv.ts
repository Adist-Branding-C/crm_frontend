export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number;
}

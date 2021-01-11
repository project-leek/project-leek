export default class ListItem {
  id: number | null;

  value: string | null;

  constructor(id?: number, val?: string) {
    this.id = id || null;
    this.value = val || null;
  }
}

export default class ListItem {
  id: number | string;

  value: string;

  constructor(id: number | string, value?: string) {
    this.id = id;
    this.value = value || id.toString();
  }
}

import { v4 } from 'uuid';

export default class Pet {
  id: string;

  name: string;

  breed: string;

  constructor(name: string, breed: string) {
    //  creates a uuid
    this.id = v4();
    this.name = name;
    this.breed = breed;
  }
}

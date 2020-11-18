import { v4 } from 'uuid';

export default class Pet {
  id: string;

  name: string;

  breed: string;

  dateOfBirth: Date;

  constructor(name: string, breed: string, dateOfBirth: Date) {
    //  creates a uuid
    this.id = v4();
    this.name = name;
    this.breed = breed;
    this.dateOfBirth = dateOfBirth;
  }
}

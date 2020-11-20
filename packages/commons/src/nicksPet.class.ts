/* eslint-disable no-console */
export default class NicksPet {
  name: string;

  hunger: number;

  constructor(name: string) {
    this.name = name;
    this.hunger = 0;
  }

  private increaseHunger(increaseValue: number) {
    if (increaseValue + this.hunger > 100) {
      this.hunger = 100;
    } else {
      this.hunger += increaseValue;
    }
  }

  play(durationInMinutes: number) {
    console.log(`Playing with your pet for ${durationInMinutes} minutes...`);
    this.increaseHunger(3 * durationInMinutes);
  }

  feed() {
    console.log('Your Pet has been fed!');
    this.hunger = 0;
  }

  showHunger() {
    if (this.hunger > 50) {
      console.log(`Your pet looks quite hungry (${this.hunger}%)`);
    } else {
      console.log(`Your pet is not hungry (${this.hunger}%)`);
    }
  }
}

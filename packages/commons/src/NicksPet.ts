export default class NicksPet {
    _name: string;
    _hunger: number;

    constructor(name: string){
        this._name = name;
        this._hunger = 0;
    }

    get name(): string {
        return this._name
    }

    set name(newName) {
        this._name = newName;
    }

    private increaseHunger(increaseValue: number){
        if(increaseValue + this._hunger > 100){
            this._hunger = 100;
        }
        else {
            this._hunger+= increaseValue;
        }
    }

    play(durationInMinutes: number ){
        console.log(`Playing with your pet for ${durationInMinutes} minutes...`);
        this.increaseHunger(3 * durationInMinutes);
    }

    feed(){
        console.log(`Your Pet has been fed!`);
        this._hunger = 0;
    }

    showHunger(){
        if(this._hunger > 50){
            console.log(`Your pet looks quite hungry (${this._hunger}%)`)
        }
        else{
            console.log(`Your pet is not hungry (${this._hunger}%)`)
        }
    }

}
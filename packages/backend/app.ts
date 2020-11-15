import fs from "@feathersjs/feathers";

interface Message {
    id?: number;
    text: string;
}

//A messages service that allows to create new
// and return all existing messages
class MessageService {
    messages: Message[] = [];
    async find(){
        //just return all our messages
        return this.messages
    }

    //Pick: choose only these properties from the Object
    async create (data: Pick<Message, "text">){
        const message: Message = {
            id: this.messages.length,
            text: data.text
        }

        this.messages.push(message)
        return message;
    }
}

const app = fs();
//Register the message service on the feathers application
app.use('messages', new MessageService());

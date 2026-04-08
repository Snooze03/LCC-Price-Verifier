import { number, password } from '@inquirer/prompts';
import 'dotenv/config';

export async function consoleLogin(FASTIFY, options) {
    let store_id = null;
    let passWord = '';

    console.log('---------- CENTRAL SERVER AUTHENTICATION ----------');
    while (true) {
        store_id = await number({
            message: 'Enter Store Number: ',
            validate: (value) => (value ? true : 'Please enter Store Number'),
        });
        passWord = await password({
            message: 'Enter Password: ',
            mask: '*',
            validate: (value) => (value ? true : 'Please enter Password'),
        });

        console.log('---------- AUTHENTICATION SUCCESS ----------');

        // validate login credentials
        fetch(`${process.env.CENTRAL_SERVER}/auth/login`, { method: 'POST' })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

        break;
    }
}

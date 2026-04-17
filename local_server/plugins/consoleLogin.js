import { number, password } from '@inquirer/prompts';
import { api, addToken } from '../api/api.js';
import 'dotenv/config';

export async function consoleLogin(FASTIFY, options) {
    let store_id = null;
    let passWord = '';

    console.log('---------- CENTRAL SERVER AUTHENTICATION ----------');

    store_id = await number({
        message: 'Enter Store Number: ',
        validate: async (value) => {
            // Add validation: if store exists!
            if (!value) return 'Please enter a Store Number';

            return true;
        },
    });

    passWord = await password({
        message: 'Enter Password: ',
        mask: '*',
        validate: (value) => (value ? true : 'Please enter Password'),
    });

    // send request
    const response = await api.post(`auth/login`, {
        store_id,
        password: passWord,
    });

    const access_token = response.data.body.access_token;
    console.log('RESPONSE: ', response);

    // add token to axios response interceptor
    await addToken(access_token);

    console.log('---------- AUTHENTICATION SUCCESS ----------');
}

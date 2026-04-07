import { input, password } from '@inquirer/prompts';
import 'dotenv/config';

export async function consoleLogin(FASTIFY, options) {
    let userName = '',
        passWord = '';

    try {
        console.log('---------- CENTRAL SERVER AUTHENTICATION ----------');
        while (true) {
            userName = await input({
                message: 'Enter Store Number: ',
                validate: async (value) => {
                    const check = await fetch(
                        `${process.env.CENTRAL_SERVER}/auth/${value}`,
                    );
                    if (value.length === 0) {
                        return 'Please enter Store Number';
                    } else if (check.status === 404) {
                        return check.statusText;
                    } else if (check.status === 200) {
                        return check.ok;
                    }
                },
            });
            passWord = await password({
                message: 'Enter Password: ',
                mask: '*',
                validate: (value) => {
                    if (value.length === 0) {
                        return 'Please enter Password';
                    }

                    return true;
                },
            });
            console.log('---------- AUTHENTICATION SUCCESS ----------');

            // after successful login, fetch config from central server
            fetch(`${process.env.CENTRAL_SERVER}/config/backend/${userName}`)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.log(error));

            break;
        }
    } catch (error) {
        console.log('Authentication Error:', error);
    }

    return 'success!';
}

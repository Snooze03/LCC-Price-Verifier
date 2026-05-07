import { rawlist } from '@inquirer/prompts';
import chalk from 'chalk';
import boxen from 'boxen';

import { api } from '#api/api';
import { Login } from './login.js';

// Event listener for prompt cancel
process.on('unhandledRejection', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log(chalk.yellow('\nCancelled Operation'));
        process.exit(0);
    }
});

export async function Menu(FASTIFY, options) {
    MenuHeader('Main Menu', 'Local Server');

    // Menu Options
    const selectedOption = await rawlist({
        message: 'Select an Option',
        choices: [
            { name: 'Login', value: 'login' },
            { name: 'Continue', value: 'continue' },
            { name: 'Exit', value: 'exit' },
        ],
        default: 'login',
        loop: true,
    });

    switch (selectedOption) {
        case 'login':
            try {
                // check if central server is up
                await api.get('/health');

                await Login();
            } catch (error) {
                // console.log(error);
                FASTIFY.log.error({
                    msg: 'Could not establish Connection to Central Server',
                    code: error.code,
                    err: {
                        message: error.message,
                    },
                });

                process.exit(0);
            }

            break;
        case 'continue':
            console.log('Continue kana bro');
            break;
        case 'exit':
            process.exit(0);
    }
}

export function MenuHeader(title, subTitle) {
    console.log(
        boxen(chalk.bold.cyan(title), {
            title: subTitle,
            textAlignment: 'center',
            padding: {
                top: 0.8,
                right: 8,
                left: 8,
                bottom: 0.8,
            },
        }),
    );
}

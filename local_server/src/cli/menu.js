import { rawlist } from '@inquirer/prompts';
import chalk from 'chalk';
import boxen from 'boxen';

import { Login } from './login.js';

// Event listener for prompt cancel
process.on('unhandledRejection', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log(chalk.yellow('\nCancelled Operation'));
        process.exit(0);
    }
});

export async function Menu() {
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
            await Login();
            break;
        case 'continue':
            console.log('Continue kana bro');
            break;
        case 'exit':
            console.log('Exit kana bro');
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

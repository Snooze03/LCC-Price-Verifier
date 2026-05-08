import { rawlist } from '@inquirer/prompts';
import chalk from 'chalk';
import boxen from 'boxen';

import { Login } from './login.js';
import { checkConfig } from '#plugins/FP-config';

// Event listener for prompt cancel
process.on('unhandledRejection', (error) => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log(chalk.yellow('\nCancelled Operation'));
        process.exit(0);
    }
});

export async function Menu(FASTIFY, options) {
    MenuHeader('Main Menu', 'Local Server');

    const choices = [
        { name: 'Login', value: 'login' },
        { name: 'Continue', value: 'continue' },
        { name: 'Exit', value: 'exit' },
    ];

    if (!(await checkConfig())) choices.splice(1, 1);

    // Menu Options
    const selectedOption = await rawlist({
        message: 'Select an Option',
        choices,
        default: 'login',
        loop: true,
    });

    switch (selectedOption) {
        case 'login':
            await Login();
            break;
        case 'continue':
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

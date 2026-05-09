export const STORE_FIELDS = [
    { name: 'store_id', label: 'Store ID', placeholder: 'e.g. 114' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'location', label: 'Location', placeholder: 'Tabaco City' },
    { name: 'endpoint', label: 'Endpoint', placeholder: '10.0.0.59' },
];

export const CONFIG_FIELDS = [
    {
        name: 'connection_type',
        label: 'Connection Type',
        placeholder: 'e.g. mysql',
    },
    { name: 'db_user', label: 'DB User' },
    { name: 'db_password', label: 'DB Password' },
    { name: 'host', label: 'Host' },
    { name: 'port', label: 'Port' },
    { name: 'db_name', label: 'Database Name' },
    { name: 'image_path', label: 'Image Path' },
];

export const ACCOUNT_FIELDS = [
    { name: 'email', label: 'Email', placeholder: 'JohnZeus@lccgroup.com' },
    { name: 'role', label: 'Role' },
    { name: 'password', label: 'Password' },
];

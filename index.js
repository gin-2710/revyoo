
//Import necessary classes from discord.js and dotenv
import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';

//Loads key-value pairs from the .env file into process.env
dotenv.config();

const bot_token = process.env.TOKEN;

//--------------------------- Set bot status to 'ONLINE' ------------------------------------------

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(bot_token);

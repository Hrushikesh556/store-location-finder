// Vercel Serverless Function for Settings (Data Visibility)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const settings = await prisma.settings.findMany();
      
      const settingsMap = {};
      settings.forEach(s => {
        settingsMap[s.key] = s.value;
      });

      return res.status(200).json({
        success: true,
        settings: settingsMap,
        dataVisible: settingsMap['dataVisibility'] !== 'hidden'
      });

    } else if (req.method === 'POST') {
      const { key, value } = req.body;

      if (!key) {
        return res.status(400).json({ success: false, error: 'Key is required' });
      }

      const setting = await prisma.settings.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });

      return res.status(200).json({
        success: true,
        setting,
        dataVisible: value !== 'hidden'
      });

    } else {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Settings API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}

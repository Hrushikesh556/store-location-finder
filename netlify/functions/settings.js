// Netlify Serverless Function for Settings (Data Visibility)
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const settings = await prisma.settings.findMany();
      
      const settingsMap = {};
      settings.forEach(s => {
        settingsMap[s.key] = s.value;
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          settings: settingsMap,
          dataVisible: settingsMap['dataVisibility'] !== 'hidden'
        })
      };

    } else if (event.httpMethod === 'POST') {
      const { key, value } = JSON.parse(event.body);

      if (!key) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Key is required' })
        };
      }

      const setting = await prisma.settings.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          setting,
          dataVisible: value !== 'hidden'
        })
      };

    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ success: false, error: 'Method not allowed' })
      };
    }

  } catch (error) {
    console.error('Settings API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      })
    };
  }
};

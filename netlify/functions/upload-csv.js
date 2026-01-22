// Netlify Serverless Function for CSV Upload
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const { csvData } = JSON.parse(event.body);

    if (!csvData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'No CSV data provided' })
      };
    }

    // Parse CSV
    const lines = csvData.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'CSV file is empty or invalid' })
      };
    }

    // Parse headers
    const headers_list = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
    
    // Map common header variations
    const headerMap = {
      shop: headers_list.find(h => ['shop', 'shop_name', 'store_name', 'store', 'name'].includes(h)),
      latitude: headers_list.find(h => ['latitude', 'lat', 'lng_lat'].includes(h)),
      longitude: headers_list.find(h => ['longitude', 'long', 'lng', 'lon'].includes(h)),
      salesman: headers_list.find(h => ['salesman', 'salesman_name', 'sales person', 'salesperson'].includes(h)),
      beat: headers_list.find(h => ['beat', 'beat_name', 'area', 'zone', 'route'].includes(h))
    };

    let inserted = 0;
    let skipped = 0;
    let errors = [];

    // Process each row
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = parseCSVLine(lines[i]);
        if (values.length < 3) continue;

        const rowData = {};
        headers_list.forEach((header, index) => {
          rowData[header] = values[index] ? values[index].trim().replace(/['"]/g, '') : '';
        });

        const shopName = rowData[headerMap.shop] || rowData.shop || rowData.store_name || 'Unknown Shop';
        const latitude = parseFloat(rowData[headerMap.latitude] || rowData.latitude || 0);
        const longitude = parseFloat(rowData[headerMap.longitude] || rowData.longitude || 0);
        const salesman = rowData[headerMap.salesman] || rowData.salesman || 'Unassigned';
        const beat = rowData[headerMap.beat] || rowData.beat || 'Unassigned';

        // Validate coordinates
        if (isNaN(latitude) || isNaN(longitude)) {
          skipped++;
          errors.push({ row: i + 1, error: 'Invalid coordinates' });
          continue;
        }

        // Check for duplicates
        const existing = await prisma.store.findFirst({
          where: {
            OR: [
              { shop: shopName },
              { store_name: shopName }
            ],
            latitude: Math.round(latitude * 1000000) / 1000000,
            longitude: Math.round(longitude * 1000000) / 1000000
          }
        });

        if (existing) {
          skipped++;
        } else {
          // Create store
          await prisma.store.create({
            data: {
              shop: shopName,
              store_name: shopName,
              latitude,
              longitude,
              salesman,
              beat
            }
          });
          inserted++;
        }
      } catch (err) {
        skipped++;
        errors.push({ row: i + 1, error: err.message });
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        summary: {
          total: lines.length - 1,
          inserted,
          skipped,
          errors: errors.length
        },
        errors: errors.slice(0, 10)
      })
    };

  } catch (error) {
    console.error('CSV Upload error:', error);
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

// Helper function to parse CSV line handling quoted values
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

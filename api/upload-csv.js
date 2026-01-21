// Vercel Serverless Function for CSV Upload
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { csvData } = req.body;

    if (!csvData) {
      return res.status(400).json({ success: false, error: 'No CSV data provided' });
    }

    // Parse CSV
    const lines = csvData.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return res.status(400).json({ success: false, error: 'CSV file is empty or invalid' });
    }

    // Parse headers
    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
    
    // Map common header variations
    const headerMap = {
      shop: headers.find(h => ['shop', 'shop_name', 'store_name', 'store', 'name'].includes(h)),
      latitude: headers.find(h => ['latitude', 'lat', 'lng_lat'].includes(h)),
      longitude: headers.find(h => ['longitude', 'long', 'lng', 'lon'].includes(h)),
      salesman: headers.find(h => ['salesman', 'salesman_name', 'sales person', 'salesperson'].includes(h)),
      beat: headers.find(h => ['beat', 'beat_name', 'area', 'zone', 'route'].includes(h))
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
        headers.forEach((header, index) => {
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
              salesman_name: salesman,
              beat_name: beat
            }
          });
          inserted++;
        }
      } catch (err) {
        skipped++;
        errors.push({ row: i + 1, error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      summary: {
        total: lines.length - 1,
        inserted,
        skipped,
        errors: errors.length
      },
      errors: errors.slice(0, 10) // Return first 10 errors
    });

  } catch (error) {
    console.error('CSV Upload error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}

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

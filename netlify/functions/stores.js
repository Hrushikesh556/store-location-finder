// Netlify Serverless Function for Store Operations
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get visibility setting first
      const settings = await prisma.settings.findFirst({
        where: { key: 'dataVisibility' }
      });
      
      const isVisible = settings ? settings.value === 'visible' : true;

      // If data is hidden, return empty stores
      if (!isVisible) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            dataVisible: false,
            stores: [],
            pagination: { total: 0, page: 1, totalPages: 0 }
          })
        };
      }

      // Get query parameters
      const { q, beat, salesman, page = 1, limit = 50 } = event.queryStringParameters || {};

      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Build where clause
      const where = {};
      
      if (q) {
        where.OR = [
          { shop: { contains: q } },
          { store_name: { contains: q } }
        ];
      }
      
      if (beat) {
        where.beat = beat;
      }
      
      if (salesman) {
        where.salesman = salesman;
      }

      // Get stores
      const [stores, total] = await Promise.all([
        prisma.store.findMany({
          where,
          skip,
          take: parseInt(limit),
          orderBy: { shop: 'asc' }
        }),
        prisma.store.count({ where })
      ]);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          dataVisible: isVisible,
          stores: stores.map(s => ({
            id: s.id,
            shop: s.shop || s.store_name,
            latitude: parseFloat(s.latitude),
            longitude: parseFloat(s.longitude),
            salesman: s.salesman || 'Unassigned',
            beat: s.beat || 'Unassigned',
            created_at: s.created_at
          })),
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit))
          }
        })
      };

    } else if (event.httpMethod === 'DELETE') {
      const { id } = event.queryStringParameters || {};
      
      if (id === 'all') {
        await prisma.store.deleteMany({});
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: 'All stores deleted' })
        };
      } else {
        await prisma.store.delete({
          where: { id: parseInt(id) }
        });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: 'Store deleted' })
        };
      }

    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ success: false, error: 'Method not allowed' })
      };
    }

  } catch (error) {
    console.error('Stores API error:', error);
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

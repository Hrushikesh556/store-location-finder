// Vercel Serverless Function for Store Operations
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get visibility setting first
      const settings = await prisma.settings.findFirst({
        where: { key: 'dataVisibility' }
      });
      
      const isVisible = settings ? settings.value === 'visible' : true;

      // Get query parameters
      const { q, beat, salesman, page = 1, limit = 50 } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Build where clause
      const where = {};
      
      if (q) {
        where.OR = [
          { shop: { contains: q, mode: 'insensitive' } },
          { store_name: { contains: q, mode: 'insensitive' } }
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
          include: {
            salesman: true,
            beat: true
          },
          skip,
          take: parseInt(limit),
          orderBy: { shop: 'asc' }
        }),
        prisma.store.count({ where })
      ]);

      return res.status(200).json({
        success: true,
        dataVisible: isVisible,
        stores: stores.map(s => ({
          id: s.id,
          shop: s.shop || s.store_name,
          latitude: parseFloat(s.latitude),
          longitude: parseFloat(s.longitude),
          salesman: s.salesman?.name || s.salesman_name || 'Unassigned',
          beat: s.beat?.name || s.beat_name || 'Unassigned',
          created_at: s.created_at
        })),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit))
        }
      });

    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (id === 'all') {
        // Delete all stores
        await prisma.store.deleteMany({});
        return res.status(200).json({ success: true, message: 'All stores deleted' });
      } else {
        // Delete single store
        await prisma.store.delete({
          where: { id: parseInt(id) }
        });
        return res.status(200).json({ success: true, message: 'Store deleted' });
      }

    } else if (req.method === 'POST') {
      // Create single store
      const { shop, store_name, latitude, longitude, salesman, beat } = req.body;
      
      const store = await prisma.store.create({
        data: {
          shop: shop || store_name,
          store_name: store_name || shop,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          salesman_name: salesman,
          beat_name: beat
        }
      });

      return res.status(201).json({ success: true, store });

    } else {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Stores API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}

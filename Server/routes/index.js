import express from 'express';
import cleaningComplaintRoutes from './cleaningComplaintRoutes.js';

const router = express.Router();

// Register all routes
router.use('/cleaning-complaints', cleaningComplaintRoutes);

export const registerRoutes = async (app) => {
  app.use('/api', router);
  return app;
}; 
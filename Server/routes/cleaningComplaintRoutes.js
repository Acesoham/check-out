import express from 'express';
import {
  submitComplaint,
  getAllComplaints,
  getComplaint,
  updateStatus,
  getComplaintsByStatus,
  searchComplaints
} from '../controllers/cleaningComplaintControllers.js';

const router = express.Router();

// Submit new cleaning complaint
router.post('/submit', submitComplaint);

// Get all cleaning complaints
router.get('/', getAllComplaints);

// Get single cleaning complaint
router.get('/:id', getComplaint);

// Update complaint status
router.patch('/:id/status', updateStatus);

// Get complaints by status
router.get('/status/:status', getComplaintsByStatus);

// Search complaints
router.get('/search', searchComplaints);

export default router;
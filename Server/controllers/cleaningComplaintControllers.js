const CleaningComplaint = require('../models/CleaningComplaint');

// Submit new cleaning complaint
exports.submitComplaint = async (req, res) => {
  try {
    // Create cleaning complaint from request body
    const cleaningComplaint = new CleaningComplaint(req.body);
    await cleaningComplaint.save();
     
    res.status(201).json({
      success: true,
      data: cleaningComplaint,
      message: 'Cleaning service complaint submitted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all cleaning complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await CleaningComplaint.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single cleaning complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await CleaningComplaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update complaint status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Check if the status is valid
    const validStatuses = ['pending', 'in-progress', 'resolved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value. Must be one of: pending, in-progress, resolved, rejected'
      });
    }
    
    const complaint = await CleaningComplaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get complaints by status
exports.getComplaintsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    // Check if the status is valid
    const validStatuses = ['pending', 'in-progress', 'resolved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value. Must be one of: pending, in-progress, resolved, rejected'
      });
    }
    
    const complaints = await CleaningComplaint.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Search complaints by mobile number or complaint ID
exports.searchComplaints = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const complaints = await CleaningComplaint.find({
      $or: [
        { MobileNumber: query },
        { complaintId: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
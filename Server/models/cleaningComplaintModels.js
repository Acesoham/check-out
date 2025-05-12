import mongoose from 'mongoose';

const cleaningComplaintSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: { 
    type: String,
    required: true
  },
  Address: {
    type: String
  },
  MobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  AadhaarCardNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{12}$/.test(v);
      },
      message: props => `${props.value} is not a valid Aadhaar number!`
    }
  },
  Complaintdetailsincludingservice: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  complaintId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  collection: 'Trn_CleaningServiceComplaint'
});

// Generate a unique complaint ID before saving
cleaningComplaintSchema.pre('save', async function(next) {
  if (!this.complaintId) {
    // Generate a complaint ID based on current date and random number
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.complaintId = `CLN-${year}${month}-${randomNum}`;
  }
  next();
});

export default mongoose.model('CleaningComplaint', cleaningComplaintSchema);
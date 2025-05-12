import React, { useState, useEffect } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, TextareaAutosize, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    mobile: '',
    aadhar: '',
    address: '',
    age: '',
    gender: 'male',
    maritalStatus: 'single',
    religion: '',
    caste: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    mobile: '',
    aadhar: '',
    age: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-capitalize first letter for name fields
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setProfile(prev => ({ ...prev, [name]: capitalized }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid email address';
      case 'mobile':
        return /^\d{10}$/.test(value) ? '' : 'Mobile number must be 10 digits';
      case 'aadhar':
        return /^\d{12}$/.test(value) ? '' : 'Aadhar number must be 12 digits';
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'username':
        return value.length >= 4 ? '' : 'Username must be at least 4 characters';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      case 'age':
        return !isNaN(Number(value)) && Number(value) > 0 ? '' : 'Age must be a positive number';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields before submit
    const newErrors = {
      username: validateField('username', profile.username),
      password: validateField('password', profile.password),
      email: validateField('email', profile.email),
      firstName: validateField('firstName', profile.firstName),
      mobile: validateField('mobile', profile.mobile),
      aadhar: validateField('aadhar', profile.aadhar),
      age: validateField('age', profile.age)
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    // Submit logic here
    console.log('Profile submitted:', profile);
    alert('Profile updated successfully!');
  };

  // Mock data load (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setProfile({
        username: 'john_doe',
        password: 'password123',
        email: 'john.doe@example.com',
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
        dob: '1990-01-15',
        mobile: '9876543210',
        aadhar: '123456789012',
        address: '123 Main St, Apt 4B, Mumbai, Maharashtra 400001',
        age: '33',
        gender: 'male',
        maritalStatus: 'married',
        religion: 'Hindu',
        caste: 'General'
      });
    }, 500);
  }, []);

  const OrangeTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#FF6B35',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#FF6B35',
      },
    },
  });

  const BlueButton = styled(Button)({
    backgroundColor: '#004E89',
    '&:hover': {
      backgroundColor: '#003D66',
    },
  });

  return (
    <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '900px', margin: '2rem auto', backgroundColor: '#F7F9FC' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', marginBottom: '2rem', textAlign: 'center' }}>
        Personal Details
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <Typography variant="h6" sx={{ color: '#004E89', margin: '1.5rem 0 1rem', borderBottom: '1px solid #004E89', paddingBottom: '0.5rem' }}>
          Basic Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={profile.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#004E89' }}>Gender</FormLabel>
              <RadioGroup row name="gender" value={profile.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Age"
              name="age"
              value={profile.age}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>
        </Grid>

        {/* Contact Information Section */}
        <Typography variant="h6" sx={{ color: '#004E89', margin: '1.5rem 0 1rem', borderBottom: '1px solid #004E89', paddingBottom: '0.5rem' }}>
          Contact Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.mobile}
              helperText={errors.mobile}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Email ID"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#004E89', marginBottom: '0.5rem' }}>Address</FormLabel>
              <TextareaAutosize
                minRows={3}
                name="address"
                value={profile.address}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderColor: errors.address ? 'red' : '#ccc',
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                  fontSize: '1rem'
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Account Information Section */}
        <Typography variant="h6" sx={{ color: '#004E89', margin: '1.5rem 0 1rem', borderBottom: '1px solid #004E89', paddingBottom: '0.5rem' }}>
          Account Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Username"
              name="username"
              value={profile.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={profile.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
        </Grid>

        {/* Government & Personal Details Section */}
        <Typography variant="h6" sx={{ color: '#004E89', margin: '1.5rem 0 1rem', borderBottom: '1px solid #004E89', paddingBottom: '0.5rem' }}>
          Government & Personal Details
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Aadhar Card Number"
              name="aadhar"
              value={profile.aadhar}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.aadhar}
              helperText={errors.aadhar}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#004E89' }}>Marital Status</FormLabel>
              <RadioGroup row name="maritalStatus" value={profile.maritalStatus} onChange={handleChange}>
                <FormControlLabel value="single" control={<Radio color="primary" />} label="Single" />
                <FormControlLabel value="married" control={<Radio color="primary" />} label="Married" />
                <FormControlLabel value="divorced" control={<Radio color="primary" />} label="Divorced" />
                <FormControlLabel value="widowed" control={<Radio color="primary" />} label="Widowed" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Religion"
              name="religion"
              value={profile.religion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrangeTextField
              fullWidth
              label="Caste"
              name="caste"
              value={profile.caste}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="flex-end" sx={{ marginTop: '2rem' }}>
          <BlueButton type="submit" variant="contained" size="large">
            Update Profile
          </BlueButton>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfilePage;
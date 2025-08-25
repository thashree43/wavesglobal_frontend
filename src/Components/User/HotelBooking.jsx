import React, { useState, useEffect } from 'react';
import Navbar from "../../Layout/Navbar";
import { baseurl } from "../../Base/Base";
import Footer from  "../../Layout/Footer";
import axios from "axios"

const HotelCheckout = () => {
  const [bookingDetails, setBookingDetails] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
    nights: 0,
    roomRate: 0,
    taxes: 0,
    total: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    country: 'United States',
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}user/getcheckout`, {
          withCredentials: true 
        });
        
        if (response.data.bookings && response.data.bookings.length > 0) {
          const latestBooking = response.data.bookings[0];
          const property = latestBooking.property;
         
          const checkInDate = new Date(latestBooking.checkIn);
          const checkOutDate = new Date(latestBooking.checkOut);
          const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
          
          // Calculate taxes (assuming 13% tax rate)
          const taxes = latestBooking.totalPrice * 0.13;
          
          // Update booking details
          setBookingDetails({
            roomType: property.title,
            checkIn: latestBooking.checkIn.split('T')[0],
            checkOut: latestBooking.checkOut.split('T')[0],
            guests: latestBooking.guests,
            nights: nights,
            roomRate: Math.round(latestBooking.totalPrice / nights),
            taxes: taxes,
            total: latestBooking.totalPrice + taxes
          });
        }
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the payment details to your backend
      // For now, we'll just simulate the booking process
      setTimeout(() => {
        setBookingComplete(true);
      }, 1500);
    } catch (err) {
      console.error('Booking submission error:', err);
      setError('Failed to complete booking. Please try again.');
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Inline styles with white/light gray theme
  const styles = {
    // ... (keep all your existing styles)
  };

  // Function to handle hover effects
  const handleHover = (e, style, hoverStyle) => {
    if (e.type === 'mouseenter') {
      Object.assign(e.target.style, hoverStyle);
    } else {
      Object.assign(e.target.style, style);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.innerContainer}>
            <div style={{textAlign: 'center', padding: '50px'}}>
              <i className="fas fa-spinner fa-spin" style={{fontSize: '48px', color: '#3e92cc'}}></i>
              <p style={{marginTop: '20px'}}>Loading booking details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.innerContainer}>
            <div style={{textAlign: 'center', padding: '50px', color: '#e74c3c'}}>
              <i className="fas fa-exclamation-triangle" style={{fontSize: '48px'}}></i>
              <p style={{marginTop: '20px'}}>{error}</p>
              <button 
                style={{...styles.btn, ...styles.btnPrimary, marginTop: '20px'}}
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (bookingComplete) {
    return (
      <>
        <Navbar />
        <div style={styles.container}>
          <style>{styles.keyframes}</style>
          <div style={styles.innerContainer}>
            <div style={styles.bookingConfirmation}>
              <div style={styles.confirmationIcon}>
                <i className="fas fa-check"></i>
              </div>
              <h2 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '15px' }}>
                Booking Confirmed!
              </h2>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                Thank you for choosing Wavestation. Your booking details have been sent to your email.
              </p>
              <button 
                style={{...styles.btn, ...styles.btnPrimary}}
                onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary, ...styles.btnPrimaryHover})}
                onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary})}
              >
                View Booking Details
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <style>{styles.keyframes}</style>
        <div style={styles.innerContainer}>
          <header style={styles.header}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>
                <i className="fas fa-water"></i>
              </div>
              <div style={styles.logoText}>Wavescation</div>
            </div>
            <nav>
              <a href="#" style={styles.backLink}>
                <i className="fas fa-arrow-left"></i> Back to Hotel
              </a>
            </nav>
          </header>

          <div style={styles.progressBar}>
            <div style={{...styles.progressBarBefore}}></div>
            <div style={{...styles.progressStep, ...(currentStep >= 1 ? styles.progressStepActive : {})}}>
              <i className="fas fa-user"></i>
              <span>Details</span>
            </div>
            <div style={{...styles.progressStep, ...(currentStep >= 2 ? styles.progressStepActive : {})}}>
              <i className="fas fa-credit-card"></i>
              <span>Payment</span>
            </div>
            <div style={{...styles.progressStep, ...(currentStep >= 3 ? styles.progressStepActive : {})}}>
              <i className="fas fa-check"></i>
              <span>Confirm</span>
            </div>
          </div>

          <div style={styles.mainContent}>
            <div style={styles.checkoutForm}>
              <h2 style={styles.sectionTitle}>
                Complete Your Booking
                <span style={styles.sectionTitleAfter}></span>
              </h2>
              
              {currentStep === 1 && (
                <div style={styles.formStep}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={styles.input}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      style={styles.input}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      style={styles.input}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    />
                  </div>
                  
                  <button 
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={nextStep}
                    onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary, ...styles.btnPrimaryHover})}
                    onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary})}
                  >
                    Continue to Payment <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              )}
              
              {currentStep === 2 && (
                <div style={styles.formStep}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="cardNumber">Credit Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        style={styles.input}
                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        style={styles.input}
                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      />
                    </div>
                  </div>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        style={styles.input}
                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="country">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        style={styles.input}
                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.target.style, styles.input)}
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={styles.buttonGroup}>
                    <button 
                      style={{...styles.btn, ...styles.btnSecondary}}
                      onClick={prevStep}
                      onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnSecondary}, {...styles.btn, ...styles.btnSecondary, ...styles.btnSecondaryHover})}
                      onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnSecondary}, {...styles.btn, ...styles.btnSecondary})}
                    >
                      <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <button 
                      style={{...styles.btn, ...styles.btnPrimary}}
                      onClick={nextStep}
                      onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary, ...styles.btnPrimaryHover})}
                      onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary})}
                    >
                      Continue to Confirm <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div style={styles.formStep}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="specialRequests">Special Requests</label>
                    <input
                      type="text"
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requests?"
                      style={styles.input}
                      onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                      onBlur={(e) => Object.assign(e.target.style, styles.input)}
                    />
                  </div>
                  
                  <div style={styles.reviewSection}>
                    <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Review Your Details</h3>
                    <div style={styles.reviewItem}>
                      <span>Name:</span>
                      <span>{formData.name || 'Not provided'}</span>
                    </div>
                    <div style={styles.reviewItem}>
                      <span>Email:</span>
                      <span>{formData.email || 'Not provided'}</span>
                    </div>
                    <div style={styles.reviewItem}>
                      <span>Phone:</span>
                      <span>{formData.phone || 'Not provided'}</span>
                    </div>
                  </div>
                  
                  <div style={styles.buttonGroup}>
                    <button 
                      style={{...styles.btn, ...styles.btnSecondary}}
                      onClick={prevStep}
                      onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnSecondary}, {...styles.btn, ...styles.btnSecondary, ...styles.btnSecondaryHover})}
                      onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnSecondary}, {...styles.btn, ...styles.btnSecondary})}
                    >
                      <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <button 
                      style={{...styles.btn, ...styles.btnPrimary}}
                      onClick={handleSubmit}
                      onMouseEnter={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary, ...styles.btnPrimaryHover})}
                      onMouseLeave={(e) => handleHover(e, {...styles.btn, ...styles.btnPrimary}, {...styles.btn, ...styles.btnPrimary})}
                    >
                      Confirm Booking <i className="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div style={styles.cartSummary}>
              <h2 style={styles.sectionTitle}>
                Booking Summary
                <span style={styles.sectionTitleAfter}></span>
              </h2>
              
              <div style={styles.bookingDetails}>
                <div style={styles.detailItem}>
                  <div>Room Type:</div>
                  <div><strong>{bookingDetails.roomType}</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Check-in:</div>
                  <div><strong>{bookingDetails.checkIn}</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Check-out:</div>
                  <div><strong>{bookingDetails.checkOut}</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Guests:</div>
                  <div><strong>{bookingDetails.guests} Adults</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Nights:</div>
                  <div><strong>{bookingDetails.nights} Nights</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Room Rate:</div>
                  <div><strong>${bookingDetails.roomRate}/night</strong></div>
                </div>
                <div style={styles.detailItem}>
                  <div>Taxes & Fees:</div>
                  <div><strong>${bookingDetails.taxes.toFixed(2)}</strong></div>
                </div>
              </div>
              
              <div style={styles.total}>
                <div>Total:</div>
                <div>${bookingDetails.total.toFixed(2)}</div>
              </div>
              
              <div style={styles.roomPreview}>
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Ocean View Suite" 
                  style={styles.roomImage}
                  onMouseEnter={(e) => Object.assign(e.target.style, { transform: 'scale(1.05)' })}
                  onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'scale(1)' })}
                />
              </div>
              
              <div style={styles.securityNote}>
                <p><i className="fas fa-shield-alt"></i> Your booking is secured with SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelCheckout;
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
          
          const taxes = latestBooking.totalPrice * 0.13;
          
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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3e92cc',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    backLink: {
      color: '#3e92cc',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontWeight: '500'
    },
    progressBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      position: 'relative',
      padding: '0 40px'
    },
    progressBarBefore: {
      content: '""',
      position: 'absolute',
      top: '20px',
      left: '0',
      right: '0',
      height: '2px',
      backgroundColor: '#e0e0e0',
      zIndex: '1'
    },
    progressStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: '2',
      color: '#95a5a6'
    },
    progressStepActive: {
      color: '#3e92cc'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '30px'
    },
    checkoutForm: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '25px',
      position: 'relative',
      paddingBottom: '10px'
    },
    sectionTitleAfter: {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '50px',
      height: '3px',
      backgroundColor: '#3e92cc',
      borderRadius: '3px'
    },
    formStep: {
      animation: 'fadeIn 0.5s ease-in-out'
    },
    formGroup: {
      marginBottom: '20px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#34495e'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #dcdfe6',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8f9fa'
    },
    inputFocus: {
      borderColor: '#3e92cc',
      boxShadow: '0 0 0 2px rgba(62, 146, 204, 0.2)',
      backgroundColor: '#fff',
      outline: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '25px'
    },
    btn: {
      padding: '12px 25px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnPrimary: {
      backgroundColor: '#3e92cc',
      color: 'white'
    },
    btnPrimaryHover: {
      backgroundColor: '#2c7bb6',
      transform: 'translateY(-2px)'
    },
    btnSecondary: {
      backgroundColor: '#95a5a6',
      color: 'white'
    },
    btnSecondaryHover: {
      backgroundColor: '#7f8c8d',
      transform: 'translateY(-2px)'
    },
    cartSummary: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      alignSelf: 'start'
    },
    bookingDetails: {
      marginBottom: '20px'
    },
    detailItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #ecf0f1'
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 0',
      borderTop: '2px solid #ecf0f1',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    roomPreview: {
      margin: '20px 0',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    roomImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    securityNote: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '6px',
      textAlign: 'center',
      color: '#7f8c8d',
      fontSize: '14px'
    },
    reviewSection: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    reviewItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      color: '#34495e'
    },
    bookingConfirmation: {
      textAlign: 'center',
      padding: '50px 20px'
    },
    confirmationIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#2ecc71',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '40px',
      margin: '0 auto 20px'
    },
    keyframes: `@keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }`
  };

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
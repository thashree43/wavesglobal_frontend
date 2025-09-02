import React, { useState, useEffect, useRef } from 'react';

const GoogleMapsComponent = ({ lat, lng, location, isExpanded }) => {
  const [mapType, setMapType] = useState('roadmap');
  const [activeView, setActiveView] = useState('Map');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ9GxgYg-jf4okROBNUfZl1d529SRxKwY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && lat && lng) {
        const mapOptions = {
          center: { lat: parseFloat(lat), lng: parseFloat(lng) },
          zoom: 15,
          mapTypeId: mapType,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: window.google?.maps?.ControlPosition?.RIGHT_CENTER,
          },
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        };

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

        if (markerRef.current) markerRef.current.setMap(null);

        markerRef.current = new window.google.maps.Marker({
          position: { lat: parseFloat(lat), lng: parseFloat(lng) },
          map: mapInstanceRef.current,
          title: location,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 8.95 31.05 0 20 0Z" fill="#E67413"/>
                <circle cx="20" cy="20" r="8" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 50),
            anchor: new window.google.maps.Point(20, 50)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">Property Location</h3>
              <p style="margin: 0; color: #666; font-size: 14px;">${location}</p>
            </div>
          `
        });

        markerRef.current.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, markerRef.current);
        });
      }
    };

    loadGoogleMaps();
  }, [lat, lng, location, mapType]);

  const handleViewChange = (view) => {
    setActiveView(view);
    if (mapInstanceRef.current) {
      if (view === 'Map') {
        setMapType('roadmap');
        mapInstanceRef.current.setMapTypeId('roadmap');
      } else if (view === 'Satellite') {
        setMapType('satellite');
        mapInstanceRef.current.setMapTypeId('satellite');
      }
    }
  };

  const openStreetView = () => {
    if (mapInstanceRef.current && lat && lng) {
      const panorama = new window.google.maps.StreetViewPanorama(
        mapRef.current,
        {
          position: { lat: parseFloat(lat), lng: parseFloat(lng) },
          pov: { heading: 34, pitch: 10 },
          visible: true
        }
      );
      mapInstanceRef.current.setStreetView(panorama);
      setActiveView('Street view');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleViewChange('Map')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'Map'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Map view
          </button>
          <button
            onClick={() => openStreetView()}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeView === 'Street view'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Street view
          </button>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleViewChange('Map')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              mapType === 'roadmap'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => handleViewChange('Satellite')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              mapType === 'satellite'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>
      
      <div 
        ref={mapRef}
        className={`w-full rounded-lg transition-all duration-300 ${
          isExpanded ? 'h-96' : 'h-64'
        }`}
        style={{ minHeight: '250px' }}
      />
      
      {!window.google && (
        <div className={`bg-gray-200 rounded-lg ${isExpanded ? 'h-96' : 'h-64'} flex items-center justify-center`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsComponent;

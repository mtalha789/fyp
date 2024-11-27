import { useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter,ModalContent, useDisclosure } from '@nextui-org/react';
import { MapPin } from 'lucide-react';


const MapComponent = () => {
  const [position, setPosition] = useState(null); 
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const handleLocateMe = () => {
    onOpen();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPosition([latitude, longitude]); 
       
        },
        (error) => {
          console.error('Error getting location: ', error);
          alert('Unable to retrieve your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  
  
  const SetMarkerOnClick = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation([lat, lng]);
      },
    });
    return selectedLocation ? <Marker position={selectedLocation} /> : null;
  };

  const handleSaveLocation = () => {
    console.log('Selected Location:', selectedLocation);
  };

  return (
    <>
    <div className='flex justify-center ' >
      <Button onPress={handleLocateMe} 
      variant='light'
      color='default'
      isIconOnly
      className='text-black rounded-full '
      >
        <MapPin   /> 
      </Button>

    </div>
    <Modal
        className="pt-9"
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
        <ModalHeader>Set Your Location</ModalHeader>
        <ModalBody>
          <div className="h-96 w-full">
            <MapContainer
              center={position || [51.505, -0.09]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {position && <Marker position={position} />}
              <SetMarkerOnClick />
            </MapContainer>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleSaveLocation} className="bg-green-500 text-white">
            Save Location
          </Button>
          <Button  onClick={onClose} className="bg-gray-500 text-white">
            Cancel
          </Button>
        </ModalFooter>
        </>
          )}
        </ModalContent>
      </Modal>
      </>
  );
};

export default MapComponent;

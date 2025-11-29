import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ArrowLeft, Edit, MapPin, Users, DollarSign, Wifi, Tv, Wind, Coffee, Check } from 'lucide-react';
import { rooms, hotelBranches } from '../../data/mockData';
import { useRoute, Link } from 'wouter';
import { useState } from 'react';

export default function RoomDetails() {
  const [, params] = useRoute('/rooms/:id');
  const room = rooms.find((r) => r.id === params?.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) {
    return (
      <DashboardLayout title="Room Not Found" description="The room you're looking for doesn't exist">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Room not found</p>
          <Link href="/rooms">
            <a className="text-[#D4AF37] hover:text-[#C4A030]">← Back to Rooms</a>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const hotel = hotelBranches.find((h) => h.id === room.hotelBranchId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Room Details" description="View and manage room information">
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/rooms">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </a>
        </Link>

        {/* Room Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2">Room {room.roomNumber}</h2>
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
                <span className="text-gray-600">{room.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{hotel?.name} - Floor {room.floor}</span>
              </div>
            </div>
            <Link href={`/rooms/${room.id}/edit`}>
              <a className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors">
                <Edit className="w-4 h-4" />
                Edit Room
              </a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3>Room Gallery</h3>
              </div>
              <div className="p-4">
                {/* Main Image */}
                <div className="h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                  {room.images[selectedImage] && (
                    <img
                      src={room.images[selectedImage]}
                      alt={`Room ${room.roomNumber}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {room.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {room.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-[#D4AF37]' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Room Details Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Capacity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="mb-4">Pricing & Capacity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Price per night</span>
                  </div>
                  <span className="text-[#D4AF37]">${room.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Max Capacity</span>
                  </div>
                  <span>{room.capacity} guests</span>
                </div>
              </div>
            </div>

            {/* Availability Calendar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Room Type</span>
                  <span>{room.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Floor</span>
                  <span>{room.floor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Description</h3>
          <p className="text-gray-600">{room.description}</p>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

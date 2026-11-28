const streetAddress = "Jl. Raya Babat - Jombang No.16, Desa Rejoagung, Kec. Ploso";
const addressLocality = "Kabupaten Jombang";
const addressRegion = "Jawa Timur";
const postalCode = "61453";

export const venue = {
  websiteUrl: "https://futsal-booking-phi.vercel.app",
  area: "Ploso, Jombang, Jawa Timur",
  address: `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`,
  postalAddress: { streetAddress, addressLocality, addressRegion, postalCode, addressCountry: "ID" },
  landmark: {
    name: "SMK Diponegoro Ploso",
    mapsUrl: "https://maps.app.goo.gl/xijcZLxLHEfLsoHK9",
  },
  whatsappNumber: "6282231104826",
  whatsappDisplay: "+62 822-3110-4826",
};

export const venueAddressMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`;

export function getVenueContactUrl(message: string) {
  return `https://wa.me/${venue.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getVenueWhatsAppUrl(details?: { court: string; date: string; time: string }) {
  const greeting = "Halo Beyond Futsal, saya mau tanya ketersediaan jadwal lapangan.";
  const message = details
    ? `${greeting}\n\nLapangan: ${details.court}\nTanggal: ${details.date}\nJam: ${details.time} WIB`
    : greeting;

  return getVenueContactUrl(message);
}
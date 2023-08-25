import Bus from '@/components/Icon/Services/Bus.vue';
import Coffee from '@/components/Icon/Services/Coffee.vue';
import Muse from '@/components/Icon/Services/Muse.vue';
import Parking from '@/components/Icon/Services/Parking.vue';
import Plane from '@/components/Icon/Services/Plane.vue';
import Restaurant from '@/components/Icon/Services/Restaurant.vue';
import Snack from '@/components/Icon/Services/Snack.vue';

export const servicesCate = [
    {
        name: 'Comptabilité',
        query_id: 'accounting',
        icon: Restaurant,
    },
    {
        name: 'Restaurants',
        query_id: 'restaurant',
        icon: Restaurant,
    },
    {
        name: `Parc d'attractions`,
        query_id: 'amusement_park',
        icon: Restaurant,
        subCategory : [
            {
                name: "cirque",
                icon: Restaurant
            },
            {
                name: "Manège",
                icon: Restaurant
            }
        ]
    },
    {
        name: 'Aéroports',
        query_id: 'airport',
        icon: Plane,
    },
    {
        name: 'Aquarium',
        query_id: 'aquarium',
        icon: Plane,
    },
    {
        name: 'ATM',
        query_id: 'atm',
        icon: Plane,
    },
    {
        name: 'Pâtisserie',
        query_id: 'bakery',
        icon: Plane,
    },
    {
        name: 'Banque',
        query_id: 'bank',
        icon: Plane,
    },
    {
        name: 'Bar',
        query_id: 'bar',
        icon: Plane,
    },
    {
        name: 'Salon de beauté',
        query_id: 'beauty_salon',
        icon: Plane,
    },
    {
        name: 'Magasin de vélos',
        query_id: 'bicycle_store',
        icon: Plane,
    },
    {
        name: 'Librairie',
        query_id: 'book_store',
        icon: Plane,
    },
    {
        name: 'Bowling',
        query_id: 'bowling_alley',
        icon: Plane,
    },
    {
        name: 'Station de bus',
        query_id: 'bus_station',
        icon: Bus,
    },
    {
        name: 'Café',
        query_id: 'cafe',
        icon: Coffee,
    },
    {
        name: 'Camping',
        query_id: 'campground',
        icon: Plane,
    },
    {
        name: 'Concessionnaire',
        query_id: 'car_dealer',
        icon: Plane,
    },
    {
        name: 'Location de voiture',
        query_id: 'car_rental',
        icon: Plane,
    },
    {
        name: 'Réparation automobile',
        query_id: 'car_repair',
        icon: Plane,
    },
    {
        name: 'Lave-Auto',
        query_id: 'car_wash',
        icon: Plane,
    },
    {
        name: 'Cimetière',
        query_id: 'cemetery',
        icon: Plane,
    },
    {
        name: 'Casino',
        query_id: 'casino',
        icon: Plane,
    },
    {
        name: 'Eglise',
        query_id: 'church',
        icon: Plane,
    },
    {
        name: 'Mairie',
        query_id: 'city_hall',
        icon: Plane,
    },
    {
        name: 'Concessionnaire',
        query_id: 'car_dealer',
        icon: Plane,
    },
    {
        name: 'Magasin de vêtements',
        query_id: 'clothing_store',
        icon: Plane,
    },
    {
        name: 'Epicerie',
        query_id: 'convenience_store',
        icon: Plane,
    },
    {
        name: 'Tribunal',
        query_id: 'courthouse',
        icon: Plane,
    },
    {
        name: 'Dentiste',
        query_id: 'dentist',
        icon: Plane,
    },
    {
        name: 'Grand magasin',
        query_id: 'department_store',
        icon: Plane,
    },
    {
        name: 'Docteur',
        query_id: 'doctor',
        icon: Plane,
    },
    {
        name: 'Pharmacie',
        query_id: 'drugstore',
        icon: Plane,
    },
    {
        name: 'Eléctricien',
        query_id: 'electrician',
        icon: Plane,
    },
    {
        name: 'Magasin d\'électronique',
        query_id: 'electronics_store',
        icon: Plane,
    },
    {
        name: 'Grand magasin',
        query_id: 'department_store',
        icon: Plane,
    },
    {
        name: 'Docteur',
        query_id: 'doctor',
        icon: Plane,
    },
    {
        name: 'Pharmacie',
        query_id: 'drugstore',
        icon: Plane,
    },
    {
        name: 'Eléctricien',
        query_id: 'electrician',
        icon: Plane,
    },
    {
        name: 'Ambassade',
        query_id: 'embassy',
        icon: Plane,
    },
    {
        name: 'Caserne de pompiers',
        query_id: 'fire_station',
        icon: Plane,
    },
    {
        name: 'Fleuriste',
        query_id: 'florist',
        icon: Plane,
    },
    {
        name: 'Maison funéraire',
        query_id: 'funeral_home',
        icon: Plane,
    },
    {
        name: 'Magasin de meubles',
        query_id: 'furniture_store',
        icon: Plane,
    },
    {
        name: 'Station-essence',
        query_id: 'gas_station',
        icon: Plane,
    },
    {
        name: 'Gym',
        query_id: 'gym',
        icon: Plane,
    },
    {
        name: 'Soin des cheveux',
        query_id: 'hair_care',
        icon: Plane,
    },
    {
        name: 'Quincaillerie',
        query_id: 'hardware_store',
        icon: Plane,
    },
    {
        name: 'Temple Hindou',
        query_id: 'hindu_temple',
        icon: Plane,
    },
    {
        name: `Magasin d'articles de maison`,
        query_id: 'home_goods_store',
        icon: Plane,
    },
    {
        name: 'Hôpital',
        query_id: 'hospital',
        icon: Plane,
    },
    {
        name: `Agence d'assurance`,
        query_id: 'insurance_agency',
        icon: Plane,
    },
    {
        name: 'Bijouterie',
        query_id: 'jewelry_store',
        icon: Plane,
    },
    {
        name: 'Lessive',
        query_id: 'laundry',
        icon: Plane,
    },
    {
        name: 'Avocat',
        query_id: 'lawyer',
        icon: Plane,
    },
    {
        name: 'Bibliothèque',
        query_id: 'library',
        icon: Plane,
    },
    {
        name: 'Station de métro',
        query_id: 'light_rail_station',
        icon: Plane,
    },
    {
        name: `Magasin d'alcool`,
        query_id: 'liquor_store',
        icon: Plane,
    },
    {
        name: 'Bureau du gouvernement local',
        query_id: 'local_government_office',
        icon: Plane,
    },
    {
        name: 'Serrurier',
        query_id: 'locksmith',
        icon: Plane,
    },
    {
        name: 'Hébergement',
        query_id: 'lodging',
        icon: Plane,
    },
    {
        name: 'Livraison de repas',
        query_id: 'meal_delivery',
        icon: Plane,
    },
    {
        name: 'Repas à emporter',
        query_id: 'meal_takeaway',
        icon: Plane,
    },
    {
        name: 'Mosqué',
        query_id: 'mosque',
        icon: Plane,
    },
    {
        name: 'Location de film',
        query_id: 'movie_rental',
        icon: Plane,
    },
    {
        name: 'Cinéma',
        query_id: 'movie_theater',
        icon: Plane,
    },
    {
        name: 'Entreprise de déménagement',
        query_id: 'moving_company',
        icon: Plane,
    },
    {
        name: 'Musé',
        query_id: 'museum',
        icon: Muse,
    },
    {
        name: 'Boîte de nuit',
        query_id: 'night_club',
        icon: Plane,
    },
    {
        name: 'peintre',
        query_id: 'painter',
        icon: Plane,
    },
    {
        name: 'Parc',
        query_id: 'park',
        icon: Plane,
    },
    {
        name: 'Parking',
        query_id: 'parking',
        icon: Parking,
    },
    {
        name: 'Animalerie',
        query_id: 'pet_store',
        icon: Plane,
    },
    {
        name: 'Pharmacie',
        query_id: 'pharmacy',
        icon: Plane,
    },
    {
        name: 'Physiothérapeute',
        query_id: 'physiotherapist',
        icon: Plane,
    },
    {
        name: 'Plombier',
        query_id: 'plumber',
        icon: Plane,
    },
    {
        name: 'Police',
        query_id: 'police',
        icon: Plane,
    },
    {
        name: 'Bureau de poste',
        query_id: 'post_office',
        icon: Plane,
    },
    {
        name: 'Ecole primaire',
        query_id: 'primary_school',
        icon: Plane,
    },
    {
        name: 'Agence immobilière',
        query_id: 'real_estate_agency',
        icon: Plane,
    },
    {
        name: 'Restaurant',
        query_id: 'restaurant',
        icon: Plane,
    },
    {
        name: 'entrepreneur en toiture',
        query_id: 'roofing_contractor',
        icon: Plane,
    },
    {
        name: 'Parc de camping-car',
        query_id: 'rv_park',
        icon: Plane,
    },
    {
        name: 'Ecole',
        query_id: 'school',
        icon: Plane,
    },
    {
        name: 'Lycée',
        query_id: 'secondary_school',
        icon: Plane,
    },
    {
        name: 'Magasin de chaussures',
        query_id: 'shoe_store',
        icon: Plane,
    },
    {
        name: 'Centre commercial',
        query_id: 'shopping_mall',
        icon: Plane,
    },
    {
        name: 'Spa',
        query_id: 'spa',
        icon: Plane,
    },
    {
        name: 'Stockage',
        query_id: 'storage',
        icon: Plane,
    },
    {
        name: 'Boutique',
        query_id: 'store',
        icon: Plane,
    },
    {
        name: 'Station de métro',
        query_id: 'subway_station',
        icon: Plane,
    },
    {
        name: 'Supermarché',
        query_id: 'supermarket',
        icon: Plane,
    },
    {
        name: 'Synagogue',
        query_id: 'synagogue',
        icon: Plane,
    },
    {
        name: 'Station de taxi',
        query_id: 'taxi_stand',
        icon: Parking,
    },
    {
        name: 'Attraction touristique',
        query_id: 'tourist_attraction',
        icon: Plane,
    },
    {
        name: 'Gare',
        query_id: 'train_station',
        icon: Plane,
    },
    {
        name: 'Gare de transport en commun',
        query_id: 'transit_station',
        icon: Plane,
    },
    {
        name: 'Agence de voyage',
        query_id: 'travel_agency',
        icon: Plane,
    },
    {
        name: 'Université',
        query_id: 'university',
        icon: Plane,
    },
    {
        name: 'Soins veterinaires',
        query_id: 'veterinary_care',
        icon: Plane,
    },
    {
        name: 'Zoo',
        query_id: 'zoo',
        icon: Plane,
    },
].sort((a,b) => {return a.name < b.name ? -1 : 1;return 0})


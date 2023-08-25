import { IAddProperty } from '@/pages/addProperty/dataProperty/AddPropertyInteface';

/* sell data */
import { saleAppartementDataPublic } from '@/pages/addProperty/dataProperty/sales/data.appartement';
import { saleBureauDataPublic } from '@/pages/addProperty/dataProperty/sales/data.bureau';
import { saleCommerceDataPublic } from '@/pages/addProperty/dataProperty/sales/data.commerce';
import { saleEntrepotDataPublic } from '@/pages/addProperty/dataProperty/sales/data.entrepot';
import { saleGarageDataPublic } from '@/pages/addProperty/dataProperty/sales/data.garage';
import { saleImmeubleAppartDataPublic } from '@/pages/addProperty/dataProperty/sales/data.immeuble-appatement';
import { saleHouseDatapublic } from '@/pages/addProperty/dataProperty/sales/data.maison';
import { saleGroundDataPublic } from '@/pages/addProperty/dataProperty/sales/data.terrain';

/* Rent data */
import { leaseAppartementDataClassic } from '@/pages/addProperty/dataProperty/lease/data.appartement';
import { leaseOfficeDataClassic } from '@/pages/addProperty/dataProperty/lease/data.bureau';
import { leaseColocationDataClassic } from '@/pages/addProperty/dataProperty/lease/data.colocation';
import { leaseCommerceDataClassic } from '@/pages/addProperty/dataProperty/lease/data.commerce';
import { leaseGarageDataClassic } from '@/pages/addProperty/dataProperty/lease/data.garage';
import { leaseHouseDataClassic } from '@/pages/addProperty/dataProperty/lease/data.maison';
import { leasePublicityDataClassic } from '@/pages/addProperty/dataProperty/lease/data.publicity';
import { leaseRoomDataClassic } from '@/pages/addProperty/dataProperty/lease/data.room';
import { leaseVegetableGargenDataClassic } from '@/pages/addProperty/dataProperty/lease/data.vegetableGarden';

enum nameType {
    studio = 'Studio',
    trotinettes = 'Trotinettes',
    velos = 'Vélos',
    sanitaire = 'Sanitaires (avec douches)',
    stockage = 'Emplacement de stockage surveillé (casier, pi',
    campement = 'Espace de campement',
    emplacementVelos = 'Emplacements pour vélo',
    emplacementParkingDisposition = 'Emplacements de parking (avec mise à disposit',
    droit = ' DROIT DE SUPERFICIE SUR UN BIEN PREEXISTANT ',
    immeubleApartement = 'Immeuble à appartements',
    entrepot = 'Entrepôt',
    commerce = 'Commerce',
    burreau = 'Bureau',
    potager = 'Potager - Terrain à cultiver',
    publicite = 'Espace publicitaire',
    chambre = 'Chambre',
    empalcementParking = 'Emplacement de parking',
    garage = 'Garage',
    villa = 'Villa',
    bungalow = 'Bungalow',
    appartement = 'Appartement',
    terrain = 'Terrain',
    maison = 'Maison',
}

function getPropertyType(
    idPorperty: string | number,
    data: Array<any>
): string {

    if (data && data.length > 0) {
        
            return data.find((elem) => elem.id === idPorperty)['name'];

    }
    else return '';
}


export const typeDataSell = function (propertyType: any, allPropertyType: Array<any>) {
    let value: Array<IAddProperty> = [];
    
    switch (getPropertyType(propertyType, allPropertyType).toLowerCase().trim()) {
        case nameType.terrain.toLowerCase().trim():
            
            value = saleGroundDataPublic;
            break;

        case nameType.maison.toLowerCase().trim():
            value = saleHouseDatapublic;
            break;

        case nameType.immeubleApartement.toLowerCase().trim():
            value = saleImmeubleAppartDataPublic;
            break;

        case nameType.garage.toLowerCase().trim():
            value = saleGarageDataPublic;
            break;

            case nameType.empalcementParking.toLowerCase().trim():

            value = saleGarageDataPublic;
            break;

        case nameType.entrepot.toLowerCase().trim():
            value = saleEntrepotDataPublic;
            break;

        case nameType.commerce.toLowerCase().trim():
            value = saleCommerceDataPublic;
            break;

        case nameType.burreau.toLowerCase().trim():
            value = saleBureauDataPublic;
            break;

        case nameType.appartement.toLowerCase().trim():
            console.log("apartement");
            
            value = saleAppartementDataPublic;
            break;

        default:
            value = saleHouseDatapublic;
            break;
    }

    return value;
};


export const typeDataRent = function(propertyType: any, allPropertyType: Array<any>) {
    let value: Array<IAddProperty> = [];
    
    switch (getPropertyType(propertyType, allPropertyType).toLowerCase().trim()) {
        case nameType.potager.toLowerCase().trim():
            
            value = leaseVegetableGargenDataClassic;
            break;

        case nameType.maison.toLowerCase().trim():
            
            value = leaseHouseDataClassic;
            break;

        case nameType.empalcementParking.toLowerCase().trim():

            value = leaseGarageDataClassic;
            break;

        case nameType.garage.toLowerCase().trim():

            value = leaseGarageDataClassic;
            break;

        case nameType.commerce.toLowerCase().trim():

            value = leaseCommerceDataClassic;
            break;

        case nameType.burreau.toLowerCase().trim():

            value = leaseOfficeDataClassic;
            break;

        case nameType.appartement.toLowerCase().trim():
            
            value = leaseAppartementDataClassic;
            break;
            
        case nameType.publicite.toLowerCase().trim():
            
            value = leasePublicityDataClassic;
            break;
            
        case nameType.chambre.toLowerCase().trim():
            
            value = leaseRoomDataClassic;
            break;

        default:
            value = leaseHouseDataClassic;
            break;
    }

    return value;
}
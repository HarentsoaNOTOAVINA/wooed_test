import { toRawIfProxy } from 'vue-chartjs/dist/utils';
import { documentList } from './../../make-offer-location/data';
import store from '@/store';

export const valueParams = function (data: Array<{}>) {
    const allParams = store.getters['AddProductModule/getAddPropertyDatas'];
    const keyField: Array<any> = [...new Set(keysField(data))];
    let newParams: any = {};

    for (let index = 0; index < keyField.length; index++) {
        const element = keyField[index];

        newParams = {
            ...newParams,
            [keyField[index]]: allParams[`${element}`],
            documents: allParams?.documents || []
        };
    }

    return newParams;
};

const keysField = function (data: Array<any>) {
    let keys: Array<any> = [];
    data.forEach((element) => {
        if (element.subItem && element.subItem.length > 0) {
            keysField(element.subItem);
        }

        keys = [...keys, element.name];
    });

    return keys;
};

// format document file

export const formatDocument = function (params: any, label?: string, name?: string) {
    const { docs } = store.getters['AddProductModule/getAddPropertyDatas'];

    let newParams: any = {};
    let documents: any = []

    for (const key in params) {
        const element = params[key];
        console.log('immopass', element)

        if (isFile(element)) {

            delete params[key]

            documents = [
                ...documents,
                {
                    file: element,
                    type: {
                        name: label,
                        // isVente: 
                    },
                }
            ];

        }
        // else {

        //     newParams = {
        //         ...params,
        //         ...newParams,
        //     };

        // }
    }

    const updatedDocuments = replaceOrAddDocument(docs, documents);

    return updatedDocuments

};

function replaceOrAddDocument(documents: any, newDocument: any) {
    if (documents && newDocument && newDocument.type && newDocument.type.name) {
        // Vérifier si le 'file' dans newDocument est vide
        if (!newDocument.file) {
            // Supprimer l’élément portant la même label (name) du tableau
            documents = documents.filter((doc: any) => doc.type.name !== newDocument.type.name);
        } else {
            const existingDocIndex = documents.findIndex((doc: any) => doc.type.name === newDocument.type.name);
            if (existingDocIndex !== -1) {
                // Si un élément du même nom existe, le remplacer par le nouvel élément
                documents[existingDocIndex] = newDocument;
            } else {
                // Si aucun élément du même nom n’existe, ajoutez le nouvel élément au tableau
                documents.push(newDocument);
            }
        }
        return documents;
    } else {
        return newDocument
    }
}


function isFile(value: any) {
    return value instanceof File;
}


// Cette fonction filtre les documents dans le store avec le 'name' spécifié
export const documentLists = function (name: string) {
    const { documents } = store.getters['AddProductModule/getAddPropertyDatas'];
    const filteredDocuments = documents.filter((doc: any) => doc.type.name === name);

    if (filteredDocuments.length > 0) {
        const filesArray = filteredDocuments.map((doc: any) => doc.file);
        return filesArray;
    }

    return [];
};
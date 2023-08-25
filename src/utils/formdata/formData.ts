export function isAnArrayorPush(key: any, value: any, formData: any) {
    if (value) {
        if (Array.isArray(value)) {
            value.forEach((e, i) => {
                let k = `${key}[${i}]`;
                let val = e;
                if (typeof e === 'object') {
                    for (const j in e) {
                        k = `${key}[${i}][${j}]`;
                        val = e[j];
                        isAnArrayorPush(k, val, formData);
                    }
                } else {
                    isAnArrayorPush(k, val, formData);
                }
            });
        } else if (typeof value === 'object') {
            const file: boolean = Object.keys(value).some(
                (elem) => elem === 'uid'
            );
            // for(let i in Object.keys(value)){
            //     if(i === 'uid')
            // }
            if (!file) {
                Object.keys(value).forEach((obj) => {
                    isAnArrayorPush(obj, value[obj], formData);
                });
            } else {
                formData.append(key, value);
            }
        } else {
            formData.append(key, value);
        }
    }
}

// function checkIfFile(keyToCheck : string) : boolean{
//     return Object.keys(e).some(elem => elem === "uid");
// }
function checkFileType(file: any) {
    // return (
    //     file?.type &&
    //     ['image', 'application'].includes(file?.type.split('/')[0])
    // );
    return (
        file &&
        typeof file.type === 'string' &&
        ['image', 'application'].includes(file.type.split('/')[0])
    );
}

// export function isAnArrayorPush2(
//     key: any,
//     value: any,
//     formData: any,
//     checkNull?: boolean
// ) {
//     if (value || value === false || value === 0) {
//         if (Array.isArray(value)) {
//             value.forEach((e, i) => {
//                 let k = `${key}[${i}]`;
//                 let val = e;
//                 if (typeof e === 'object') {
//                     const file3: boolean = checkFileType(e);

//                     if (!file3) {
//                         for (const j in e) {
//                             k = `${key}[${i}][${j}]`;
//                             val = e[j];
//                             isAnArrayorPush2(k, val, formData);
//                         }
//                     } else {
//                         formData.append(`${key}[${i}]`, e);
//                     }
//                 } else {
//                     isAnArrayorPush2(k, val, formData);
//                 }
//             });
//         } else if (typeof value === 'object') {
//             const file3: boolean = checkFileType(value);
//             if (!file3) {
//                 Object.keys(value).forEach((obj) => {
//                     isAnArrayorPush2(obj, value[obj], formData);
//                 });
//             } else {
//                 formData.append(key, value);
//             }
//         } else {
//             formData.append(key, value);
//         }
//     }
// }

export function isAnArrayorPush2(
    key: string,
    value: any,
    formData: FormData,
    checkNull?: boolean
) {
    if (value || value === false || value === 0) {
        if (Array.isArray(value)) {
            value.forEach((e, i) => {
                let k = `${key}[${i}]`;
                let val = e;
                if (typeof e === 'object') {
                    const file3: boolean = checkFileType(e);

                    if (!file3) {
                        for (const j in e) {
                            k = `${key}[${i}][${j}]`;
                            val = e[j];
                            isAnArrayorPush2(k, val, formData);
                        }
                    } else {
                        formData.append(`${key}[${i}]`, e);
                    }
                } else {
                    isAnArrayorPush2(k, val, formData);
                }
            });
        } else if (typeof value === 'object') {
            const file3: boolean = checkFileType(value);
            if (!file3) {
                Object.keys(value).forEach((obj) => {
                    isAnArrayorPush2(`${key}[${obj}]`, value[obj], formData); // Génération de clé de l'objet
                });
            } else {
                formData.append(key, value);
            }
        } else {
            formData.append(key, value);
        }
    }
}

export function createFormData(data: any, checkNull?: boolean) {
    const formData = new FormData();

    Object.keys(data).forEach((item) => {
        isAnArrayorPush2(item, data[item], formData, checkNull);
    });

    return formData;
}

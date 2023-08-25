export const requiredControl =  (data: Array<{}>, params: any) => {
    let error: object = {}
    data.forEach((element: any) => {
        if (element.required) {
            
            error = {
                ...error,
                [element.name]: !params[element.name] ? '': params[element.name] === -1 ? '': params[element.name]
            }
            // if(element.subItem && element.subItem.length > 0 ) {
            //     console.log("tafinditra tsara ato mihitsy ");
            //     // requiredControl(element.subItem, params)
            // }
        } 
    });
    return error
}


// const requiredCheck = function(data: Array<{}>, params: any) {
//     data.forEach((element: any) => {
//         if (element.required) {
//             error = {
//                 ...error,
//                 [element.name]: !params[element.name] ? '': params[element.name] === -1 ? '': params[element.name]
//             }
//         } 
//     });
// }

const id  = "fa_container";

export const FontAwesomePromise = new Promise((resolve, reject)=>{
    const styleElement = document.querySelectorAll('#' +id);
    if(styleElement.length < 1){
        const fa  = document.createElement('link');
        fa.id = id;
        fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        fa.rel = "stylesheet";
        (document as any).querySelector('head').appendChild(fa);
        fa.onload = ()=>{
            resolve("ready");
        }
    }
        
})
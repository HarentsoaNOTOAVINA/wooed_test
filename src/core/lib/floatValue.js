export const checkStr = function (value, evt) {
    const charCode = evt.which ? evt.which : event.keyCode;

    console.log(charCode);
    console.log('value', value.indexOf('.'));
    if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        (charCode !== 46 || value.indexOf('.') !== -1) &&
        charCode !== 44
    ) {
        console.log('ato');
        /*     this.indexValue =this[value];
  console.log(evt.preventDefault()) */
        evt.preventDefault();
        /*  this[value] = evt.preventDefault() */
        return false;
    }

    if (
        (value !== null &&
            value.indexOf('.') > -1 &&
            value.split('.')[1].length > 1) ||
        (value !== null &&
            value.indexOf(',') > -1 &&
            value.split(',')[1].length > 1)
    ) {
        evt.preventDefault();
    }
    return true;
};

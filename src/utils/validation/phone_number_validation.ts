function validatePhone(num : string) {
    // regex pattern for phone number
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    // check if the phone number is valid
    let result = num.match(re);
    if (result) {
        return true;
    }
    else {
        return false;
    }
}

export default validatePhone;
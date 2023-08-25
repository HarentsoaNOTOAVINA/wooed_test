const emailValidation: Function = function (string: string): Boolean {
    const regex: RegExp = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    return regex.test(string);
};

export default emailValidation;

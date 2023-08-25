const isNotEmpty: Function = function (value: string | any[]): Boolean {
    return (value === null || (Array.isArray(value) && value.length === 0) || value === "")
};

export default isNotEmpty;
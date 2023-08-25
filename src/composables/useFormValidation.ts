import { reactive } from '@vue/reactivity';
let isValid = reactive<Object | any>({});
export default function useFormValidation() {
    const validateNameField = (fieldName: string, fieldValue: any) => {
        isValid[fieldName] = fieldValue === '' ? false : true;
        console.log(isValid);
    };
    const resetError = () => {
        isValid = {};
    };
    return { isValid, validateNameField, resetError };
}

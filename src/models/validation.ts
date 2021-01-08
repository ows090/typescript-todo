export interface Validatable {
    value: string | number;
    required?: boolean;
    max?: number;
    min?: number;
    maxLen?: number;
    minLen?: number;
}


export const validate = (validatableInput : Validatable)=> {
    let isValid = true;
    const value = validatableInput.value;
    if(validatableInput.required){
        isValid = isValid && value.toString().trim().length !== 0;
    }
    if(validatableInput.max && typeof value === 'number'){
        isValid = isValid && value <= validatableInput.max;
    }
    if(validatableInput.min && typeof value === 'number'){
        isValid = isValid && value >= validatableInput.min;
    }
    if(validatableInput.maxLen && typeof value === 'string'){
        isValid = isValid && value.length <= validatableInput.maxLen;
    }
    if(validatableInput.minLen && typeof value === 'string'){
        isValid = isValid && value.length >= validatableInput.minLen;
    }
    return isValid;
}
## SepatorMillier:
- path: "@/utils/separator-number/SeparatorMiller";
- parameters: (separator, number);
    .separator: facultatif, default: ' '
    .number: nombre a formater
-example: {
    import { separatorMillier } from "@/utils/separator-number/SeparatorMiller"
    
    separatorMillier(25000) => result = 25 000
}
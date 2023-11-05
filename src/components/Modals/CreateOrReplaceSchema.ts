import * as yup from "yup";

export const createOrReplaceSchema = yup.object().shape({
    name: yup.string().required("Nome do item obrigatório"),
    description: yup.string().required("Descrição obrigatória"),
    price: yup.string().required("Preço obrigatório"),
    image: yup.string().required("Imagem obrigatória"),
});
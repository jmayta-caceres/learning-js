import '../css/componentes.css';

export const saludar = (name) => {
    console.log(`Hello ${name} from console`);
    const h1 = document.createElement("h1");
    h1.innerText = `Hello ${name} from document`;
    document.body.append(h1);
}
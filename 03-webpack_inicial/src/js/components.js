import "../css/componentes.css"
import webpacklogo from "../assets/img/webpack-logo.png"


export const saludar = (name) => {
    console.log(`Hello ${name} from console`);
    const h1 = document.createElement("h1");
    h1.innerText = `Hello ${name} from document`;
    document.body.append(h1);
    
    const img = document.createElement("img");
    img.src = webpacklogo;
    document.body.append(img);
};

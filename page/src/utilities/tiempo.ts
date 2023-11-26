
export const generarTiempo = (tiempo:string) =>{
    const mili = Date.parse(tiempo);
    const date = new Date(mili);
    return `${date.toLocaleDateString()}, Hora: ${date.toLocaleTimeString()}`;
}
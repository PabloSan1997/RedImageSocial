

export function generarFormdata(datos:AgregarImagen):FormData{
    const formData = new FormData();

  // Iterar sobre las propiedades del objeto y agregarlas a FormData
  for (const key in datos) {
    // eslint-disable-next-line no-prototype-builtins
    if (datos.hasOwnProperty(key)) {
      formData.append(key, datos[key as PROPS].toString());
    }
  }

  return formData;
}
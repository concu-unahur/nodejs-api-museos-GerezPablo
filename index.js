const superagent = require('superagent');
const fs = require('fs');

function escribirArchivo(error) {
  if (error) { throw new Error('algo se rompió', error); }
  fs.writeFile('./museos.txt',"Museos: \n", getValuesMuseums);
  fs.writeFile('./organismos.txt',"Organismos: \n",getValuesOrganisms);
}

function appendMuseosAlArchivo(error, respuesta) {
  if (error) { throw new Error('algo se rompió', error); }
  const museos = respuesta.body.results;

  museos.forEach(museo => { 
    actual = `${museo.nombre} (${museo.direccion}). Por cualquier consulta comunicarse al ${museo.telefono}\n`
    fs.appendFile('./museos.txt',actual, end);
  });
}

function appendOrganismosAlArchivo(error, respuesta) {
  if (error) { throw new Error('algo se rompió', error); }  
  const organismos = respuesta.body.results;

  organismos.forEach(organismo => { 
    actual = `Organismo: ${organismo.nombre} (${organismo.direccion}). Por cualquier consulta comunicarse al ${organismo.telefono}\n`
    fs.appendFile('./organismos.txt',actual, end);
  });
}

function end(error){
  if (error) { throw new Error('algo se rompió', error); }
  else { console.log('Terminado.'); }
}

function getValuesMuseums(error){
  if (error) { throw new Error('algo se rompió', error);}
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(appendMuseosAlArchivo)
}

function getValuesOrganisms(error) {
  if (error) { throw new Error('algo se rompió', error);}
  superagent
  .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(appendOrganismosAlArchivo)
}

escribirArchivo();
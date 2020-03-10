const superagent = require('superagent');
const fs = require('fs');

function escribirArchivo(error, respuesta) {
    if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  var actual = ""

  for(var i = 0; i < cantidad; i ++) {
    var museo = museos[i]
    actual = `El primer museo se llama: ${museo.nombre}.`;
  }
  fs.writeFile ('./museos.txt',actual,end);
}

function end(error){
  if (error) {
    throw new Error('algo se rompió', error);
  }
  else{
    console.log('Terminado.')
  }
}

//console.log('Antes de llamar a superagent')



superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(escribirArchivo)



//console.log('Después de llamar a superagent')

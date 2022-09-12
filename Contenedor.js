// >> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.


const fs = require('fs');

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo;
    }

    async #leerArchivo(){
        try{
        const contenido = await fs.promises.readFile(this.rutaArchivo,'utf-8');
        const constenidoParseado = JSON.parse(contenido);
        return constenidoParseado;
        //console.log(contenidoParseado)
        } catch (err){
            console.log(err)
        }

    
        }

        async save(obj){ // guarda un objeto en el archivo, devuelve el id asignado
            const contenidoArchivo =  await this.#leerArchivo()
            if (contenidoArchivo.length !== 0) {
                console.log(contenidoArchivo)
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2), 'utf-8')
            } else {            
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...obj, id: 1} ]), 'utf-8')
            }
    
        }
    

    async getById(id){
        const contenidoArchivo = await this.#leerArchivo()
          
                const idObj =  await contenidoArchivo.find(e => e.id === id )
                if(idObj == undefined){
                    console.log(null)
                    //return null
                }else{
                    console.log(idObj);
                }
           
        }


    async getAll(){
        try{
            const content = await this.#leerArchivo()
            if(content.length){
                return content
            }else{return null}
        }catch(err){
            console.log(err)    
        }
        
    }
    async deleteById(id){
        const contenidoArchivo =  await this.#leerArchivo()
        const findId = await contenidoArchivo.findIndex(e => e.id === id);
        await contenidoArchivo.splice(findId,1)
        await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...contenidoArchivo}],null,2),'utf-8')
        
        //console.log(contenidoArchivo)

      

    }
    async deleteAll(){
        const contenidoArchivo = await this.#leerArchivo();
        await contenidoArchivo.splice(0, contenidoArchivo.length)
        await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(contenidoArchivo),'utf-8')
        // console.log(contenidoArchivo)
    }

    async getProductRamdom(){
        try {
            let data = await this.#leerArchivo(this.rutaArchivo)
            let random = Math.floor(Math.random() * data.length)
            console.log(data[random])
        } catch (error) {
            console.log(error)
        }
    } 

}

module.exports = {Contenedor}
const container = new Contenedor('./product.txt');

container.getAll()


container.getProductRamdom()


// container.save({name:'producto17', price: 100 });

// container.getAll();

// container.getById(3)

// container.deleteById(2);

// container.deleteAll()




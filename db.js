// const { MongoClient, ObjectId } = require("mongodb");
// const { MONGODB_USR, MONGODB_PWD } =  require("./config.js");

// const uri =
//   "mongodb+srv://" + MONGODB_USR + ":" + MONGODB_PWD + "@test.babiouw.mongodb.net/?retryWrites=true&w=majority&appName=test";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let personajesCollection;

// async function conectarMongoDB() {
//     try {
//         await client.connect();
//         console.log('Conexión a MongoDB establecida');
//         const database = client.db('db1');
//         personajesCollection = database.collection('personajes');
//     } catch (err) {
//         console.error('Error al conectar con MongoDB:', err);
//     }
// }
// conectarMongoDB();


// async function mostrarTodo() {
//   if (!personajesCollection) {
//       throw new Error('La colección de personajes no está inicializada');
//   }
//   return await personajesCollection.find({}).toArray();
// }
// async function agregar(personaje) {
//   if (!personajesCollection) {
//       throw new Error('La colección de personajes no está inicializada');
//   }
//   return await personajesCollection.insertOne(personaje);
// }
// async function eliminar(id) {
//   if (!personajesCollection) {
//       throw new Error('La colección de personajes no está inicializada');
//   }
//   const objectId = new ObjectId(id);
//   return await personajesCollection.deleteOne({ _id: objectId });
// }

// module.exports = { mostrarTodo, agregar, eliminar}
const { MongoClient, ObjectId } = require("mongodb");
const { MONGODB_USR, MONGODB_PWD } = require("./config.js");

const uri = `mongodb+srv://${MONGODB_USR}:${MONGODB_PWD}@test.babiouw.mongodb.net/?retryWrites=true&w=majority&appName=test`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let personajesCollection;

async function conectarMongoDB() {
    try {
        await client.connect();
        console.log('Conexión a MongoDB establecida');
        const database = client.db('db1');
        personajesCollection = database.collection('personajes');
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
    }
}
conectarMongoDB();

async function mostrarTodo() {
    if (!personajesCollection) {
        await conectarMongoDB();
        if (!personajesCollection) {
            throw new Error('La colección de personajes no está inicializada');
        }
    }
    return await personajesCollection.find({}).toArray();
}

async function agregar(personaje) {
    if (!personajesCollection) {
        await conectarMongoDB();
        if (!personajesCollection) {
            throw new Error('La colección de personajes no está inicializada');
        }
    }
    return await personajesCollection.insertOne(personaje);
}
async function eliminar(id) {
    if (!personajesCollection) {
        await conectarMongoDB();
        if (!personajesCollection) {
            throw new Error('La colección de personajes no está inicializada');
        }
    }
    const objectId = new ObjectId(id);
    return await personajesCollection.deleteOne({ _id: objectId });
}
async function actualizar(id, datosActualizar) {
  try {
      if (!personajesCollection) {
          await conectarMongoDB();
          if (!personajesCollection) {
              throw new Error('La colección de personajes no está inicializada');
          }
      }
      
      const objectId = new ObjectId(id);
      const result = await personajesCollection.updateOne(
          { _id: objectId },
          { $set: datosActualizar }
      );
      
      return result;
  } catch (err) {
      console.error('Error al actualizar personaje en MongoDB:', err);
      throw err;
  }
}
async function obtenerPersonajePorId(id) {
    if (!personajesCollection) {
        await conectarMongoDB();
        if (!personajesCollection) {
            throw new Error('La colección de personajes no está inicializada');
        }
    }
    const objectId = new ObjectId(id);
    return await personajesCollection.findOne({ _id: objectId });
}
module.exports = { mostrarTodo, agregar, eliminar,actualizar,obtenerPersonajePorId };
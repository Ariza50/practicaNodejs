**Puesta en marcha del API**

Primero arrancamos la bd con ./start.sh

Luego ponemos en marcha nuestra API con el comando npm start que viene provisto de el nodemon en modo debug.

Puesto que se prevee que el API va a tener muchas peticiones, se arranca en modo cluster.


**Funcionalidades del API**

**Cada anuncio tiene la siguiente estructura:**

nombre :    [String] -> Nombre de lo que se compra o se vende. 
venta :     [true, false] -> true si el artículo se vende, false si se busca. 
precio :    [float]  -> Precio de venta o estimado de compra.
foto :      [String] -> URL de donde se ubica la imagen.
tags :      [work, lifestyle, motor, mobile] -> Los tags definidos son los únicos disponibles.

**Puesto que el API esta disponible en varios idiomas para la gestión de errores, a todas las funciones abajo especificadas se les debe añadir**
**un parámetro por query string llamado lg [es|en]**

**Para consultar los anuncios el usuario en cuestión deberá estar registrado, para ello el API dispone de la siguiente función:**

http://localhost:3000/apiv1/usuarios?lg=es

a la cual deberá pasarle en el body la siguiente información:

nombre: nombreUsuario
email:  email@email.com
pwd:    passUsuario

**La autenticación se realiza a través de jsonWebToken y se provee a través de la siguiente función:**

http://localhost:3000/apiv1/usuarios/login?lg=es

**a la cual mediante el body se le pasan los siguientes datos:**

user: nombreUsuario
pwd: passUsuario

**Y si todo es correcto la función nos devolverá el token correspondiente para usar en las interacciones que lo requieran (consulta de anuncios y consulta de tags).**

**La lista de anuncios completa se devuelve llamando a:**

http://localhost:3000/apiv1/anuncios?lg=es

**Si queremos aplicar algun filtro tendremos que pasarle los parámetros mediante query string**

**Para filtrar por nombre o parte de él y con caseInsensivity:**

http://localhost:3000/apiv1/anuncios?lg=es&nombre=elNombreQueSea

**Si además queremos también que el precio sea el que le indicamos podemos llamar de la siguiente manera:**

http://localhost:3000/apiv1/anuncios?lg=es&nombre=elNombreQueSea&precio=45

**Si queremos que el precio esté en un rango definido:**

http://localhost:3000/apiv1/anuncios?lg=es&nombre=elNombreQueSea&precio=40&precio=45

**Para filtrar si el anuncio es de compra o venta tenemos que pasar un true o un false a traves de la variable query "venta"**

http://localhost:3000/apiv1/anuncios?lg=es&venta=false

**También podemos filtrar por uno o varios tags de entre los disponibles [work, lifestyle, motor, mobile]**

Por un tag:
http://localhost:3000/apiv1/anuncios?lg=es&tags=motor

Por varios tags:
http://localhost:3000/apiv1/anuncios?lg=es&tags=motor&tags=mobile

**Para recuperar la lista de tags disponibles tenemos la función:**

http://localhost:3000/apiv1/tags?lg=es


****Práctica DevOps****

La direccion ip es (Bootstrap):
http://34.193.5.246/

Dentro de esta página podrás encontrar un botón con la ip a la la API nodepop
y también un botón con la imagen estática servida por Nginx.



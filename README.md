### Proyecto final de curso de ReactJS, comision 25022, Talento Tech. 
### Marcelo Augusto Garassino
### DNI 23.974.934
### marauggar@gmail.com
<br/>
<br/>
<br/>
Link al repositorio GitHub:
https://github.com/MarceloAGarassino/Talento_Tech-ReactJS-Final
<br/>
<br/>
Link al proyecto funcionando:
http://gara.ddns.net/talento-tech-ReactJS/dist
<br/>
<br/>
Link a la api:
http://gara.ddns.net:21818/reactjs
<br/>
<br/>
<br/>
El proyecto funcinando, frontend y backend, están alojados en el servidor de mi casa, por lo que su funcionamiento esta sujeto al cumplimiento de entrega de servicio por parte de EDESUR y CABLEVISION/FLOW/FIBERTEL

Para el login la api tiene dos tipos de perfil de usuario y uno para usuario inexistente:
<br/>
<br/>
<br/>
**1) perfil: administrador**
<br/>
<br/>
nombre: admin
<br/>
<br/>
contraseña: AdMiN
<br/>
<br/>
<br/>
**2) perfil: usuario comun**
<br/>
<br/>
nombre: [cualquier nombre]
<br/>
<br/>
contraseña: 123
<br/>
<br/>  
**3) perfil: usuario inexistente:** en caso que ninguno de estos sea reconocido la api devuelve el siguiente json:
<br/>
{  
  "nombre": "Inexistente",  
  "contrasena": "Inexistente",  
  "perfil": "Ese usuario o contraseña no fue registrado."  
}  
<br/>
<br/>
<br/>
En el caso que el perfil de administrador haya iniciado sesión, aparecerá sobre el textbox de búsqueda el botón para agregar destinos. También aparecerán al lado de la foto de cada destino los botones para editar y borrar, todos completamente funcionales.  
En el carrito de compras el botón de 'Finalizar compra' también impacta sobre el stock, descontando los items en la api.  
Las funciones de CRUD se pueden verificar en la pagina de la Api a través del SWAGGER que incorporé a esta.  
También están disponibles mediante el SWAGGER la prueba de login y una opción de reset de la persistencia que se almacena en un archivo json.
<br/>
<br/>
<br/>
<br/>

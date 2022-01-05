###Mongo in docker


configuracion de docker para mongo
````
docker run --name <custom-name> -p 27018:27017 -d mongo:4.2
````

Conexion de
```
mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false
```
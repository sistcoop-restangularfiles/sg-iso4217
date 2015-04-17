# iso4217 - restangular library

Es un api que permite usar restangular models para iso4217.

> Revisar iso4217 para mayor informacion.

### Url rest
Puede cambiar el url de los servicios restfull con 

````javascript
// Change url restful services
app.config(function(sgIso4217Provider){
    sgIso4217Provider.restUrl = 'https://someweb/rest';
});
````

### Factories
* SGCurrency

| Method        URL                                 | Descripcion                       |
| :-------------------------------------------------|:----------------------------------|
| SGCountryCode.$build()                            | Crea objeto vacio                 |
| SGCountryCode.$saveByAlphabeticCode()             | Guarda segun alphabeticCode       |
| SGCountryCode.$saveByNumericCode()                | Guarda segun numericCode          |
| SGCountryCode.$search(params)                     | Buscar segun parametros           |
| SGCountryCode.$findByAlphabeticCode(alpha2Code)   | Buscar uno segun alphabeticCode   |
| SGCountryCode.$findByNumericCode(numericCode)     | Buscar uno segun numericCode      |
| SGCountryCode.$count()                            | Contar size()                     |
| SGCountryCode.$removeByAlphabeticCode(alpha2Code) | Eliminar uno segun alphabeticCode |
| SGCountryCode.$removeByNumericCode(numericCode)   | Eliminar uno segun numericCode    |

Los objetos countryCodes tienen la siguiente estructura:

```json
"currency": {
   "entity": "String",
   "currency": "String",
   "alphabeticCode": "String",
   "numericCode": "String",
   "minorUnit": "Integer"
}

```

### Version
1.0.0

### Tecnologías

Dependences:

* [JavaEE] - javaEE

Este proyecto es mantenido por SistCoop S.A.C.

License
----

MIT
'use strict';

(function(){

    var module = angular.module('sg-iso4217', ['restangular']);


    module.provider('sgIso4217', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });


    module.factory('Iso4217Restangular', ['Restangular', 'sgIso4217', function(Restangular, sgIso4217) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgIso4217.getRestUrl());
        });
    }]);

    var RestObject = function (path, restangular, extendMethods) {
        var modelMethods = {

            /**
             * Retorna url*/
            $getBasePath: function () {
                return path;
            },
            /**
             * Retorna la url completa del objeto*/
            $getAbsoluteUrl: function () {
                return restangular.one(path, this.id).getRestangularUrl();
            },
            /**
             * Concatena la url de subresource con la url base y la retorna*/
            $concatSubResourcePath: function (subResourcePath) {
                return this.$getBasePath() + '/' + this.id + '/' + subResourcePath;
            },


            $new: function (id) {
                return angular.extend({id: id}, modelMethods);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethods, {
                    $save: function () {
                        return restangular.all(path).post(this);
                    }
                });
            },

            $search: function (queryParams) {
                return restangular.all(path).get(queryParams);
            },

            $find: function (id) {
                return restangular.one(path, id).get();
            },
            $save: function () {
                return restangular.one(path, this.id).customPUT(restangular.copy(this), '', {}, {});
            },
            $saveSent: function (obj) {
                return restangular.all(path).post(obj);
            },

            $enable: function () {
                return restangular.one(path, this.id).all('enable').post();
            },
            $disable: function () {
                return restangular.one(path, this.id).all('disable').post();
            },
            $remove: function () {
                return restangular.one(path, this.id).remove();
            }
        };

        modelMethods = angular.extend(modelMethods, extendMethods);

        restangular.extendModel(path, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethods);
            } else {
                return angular.extend({id: obj}, modelMethods)
            }
        });

        restangular.extendCollection(path, function (collection) {
            angular.forEach(collection, function (row) {
                angular.extend(row, modelMethods);
            });
            return collection;
        });

        return modelMethods;
    };


    module.factory('SGCurrency', ['Iso4217Restangular',  function(Iso4217Restangular) {
        var countryCodeResource = RestObject('currencies', Iso3166Restangular);
        return countryCodeResource;
    }]);

})();
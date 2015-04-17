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


    module.factory('Iso4217AbstractModel', ['Iso4217Restangular', function(Iso4217Restangular){

        var url = '';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return Iso4217Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso4217Restangular.one(url, this.id).customPUT(Iso4217Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso4217Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso4217Restangular.all(url).getList(queryParams);
            },

            $remove: function(id){
                return Iso4217Restangular.one(url, id).remove();
            }
        }
    }]);


    module.factory('SGCurrency', ['Iso4217Restangular',  function(Iso4217Restangular) {

        var url = 'currency';
        var urlAlphabeticCode = 'currency/alphabeticCode';
        var urlNumericCode = 'currency/numericCode';
        var urlCount = 'currency/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return Iso4217Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso4217Restangular.one(urlAlphabeticCode, this.alphabeticCode).customPUT(Iso4217Restangular.copy(this),'',{},{});
            },

            $saveByAlphabeticCode: function() {
                return Iso4217Restangular.one(urlAlphabeticCode, this.alphabeticCode).customPUT(Iso4217Restangular.copy(this),'',{},{});
            },
            $saveByNumericCode: function() {
                return Iso4217Restangular.one(urlNumericCode, this.numericCode).customPUT(Iso4217Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso4217Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso4217Restangular.all(url).getList(queryParams);
            },
            $findByAlphabeticCode: function(alphabeticCode){
                return Iso4217Restangular.one(urlAlphabeticCode, alphabeticCode).get();
            },
            $findByNumericCode: function(numericCode){
                return Iso4217Restangular.one(urlNumericCode, numericCode).get();
            },

            $count: function(){
                return Iso4217Restangular.one(urlCount).get();
            },

            $disable: function(){
                return Iso4217Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso4217Restangular.one(url, id).remove();
            },
            $removeByAlphabeticCode: function(alphabeticCode){
                return Iso4217Restangular.one(urlAlphabeticCode, alphabeticCode).remove();
            },
            $removeByNumericCode: function(id){
                return Iso4217Restangular.one(urlNumericCode, id).remove();
            }
        };

        Iso4217Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso4217Restangular.extendModel(urlAlphabeticCode, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso4217Restangular.extendModel(urlNumericCode, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso4217Restangular.extendModel(urlCount, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);

})();
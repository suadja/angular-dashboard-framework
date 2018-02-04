'use strict';

angular.module('adf.widget.switches', ['adf.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('switches', {
                title: 'Edge Switches',
                description: 'Status for edge switches',
                templateUrl: '{widgetsPath}/switches/src/view.html',
                controller: 'switchesController',
                edit: {
                    templateUrl: '{widgetsPath}/switches/src/edit.html'
                }
            });
    })
    .controller('switchesController', function ($scope) {

    });
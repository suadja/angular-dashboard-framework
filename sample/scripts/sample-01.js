'use strict';

angular.module('sample-01', ['adf', 'LocalStorageModule'])
    .controller('sample01Ctrl', function ($scope, localStorageService) {

        console.log('SAMPLE 1!');

        var name = 'sample-01';
        // var model = localStorageService.get(name);
        var model = null;
        if (!model) {
            // set default model for demo purposes
            model = {
                title: "Network Health example",
                structure: "4-8",
                rows: [
                    {
                        columns: [
                            {
                                styleClass: "col-md-6",
                                widgets: [
                                    {
                                        type: "gauge",
                                        title: "Bandwidth usage (Downstream)",
                                        config: {
                                            min: 0,
                                            max: 1000,
                                            unit: 'Mbps',
                                            title: 'Downstream',
                                            icon: 'ion-arrow-down-a',
                                            value: 400,
                                            isVertical: false,
                                        },
                                    }]
                            },
                            {
                                styleClass: "col-md-6",
                                widgets: [{
                                    type: "gauge",
                                    title: "Bandwidth usage (Upstream)",
                                    config: {
                                        min: 0,
                                        max: 1000,
                                        unit: 'Mbps',
                                        title: 'Upstream',
                                        icon: 'ion-arrow-up-a',
                                        value: 120,
                                        isVertical: false,
                                    },
                                }]
                            }]
                    },
                    {
                        columns: [
                            {
                                styleClass: "col-md-4 widget--secundary",
                                widgets: [
                                    {
                                        type: "gauge",
                                        title: "Power Meter",
                                        config: {
                                            min: 0,
                                            max: 2000,
                                            unit: 'W',
                                            title: 'Power in use',
                                            icon: 'ion-flash',
                                            value: 500,
                                            isVertical: true,
                                            updateInterval: 1000
                                        },
                                    }
                                ]
                            },
                            {
                                styleClass: "col-md-8 widget--secundary",
                                widgets: [
                                    {
                                        type: "switches",
                                        title: "Edge Switches status",
                                        config: {
                                            counts: {
                                                active: 10,
                                                total: 16,
                                            },
                                        },
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
        $scope.name = name;
        $scope.model = model;
        $scope.collapsible = false;
        $scope.maximizable = false;
        $scope.categories = true;
        console.log($scope.model);

        $scope.$on('adfDashboardChanged', function (event, name, model) {
            localStorageService.set(name, model);
        });
    });

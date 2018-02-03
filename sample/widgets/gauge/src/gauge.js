'use strict';

angular.module('adf.widget.gauge', ['adf.provider'])
  .config(function (dashboardProvider) {
    dashboardProvider
      .widget('gauge', {
        title: 'gauge',
        description: 'gauge js',
        templateUrl: '{widgetsPath}/gauge/src/view.html',
        controller: 'gaugeController',
        edit: {
          templateUrl: '{widgetsPath}/gauge/src/edit.html'
        }
      });
  })
  .controller('gaugeController', function ($scope, $interval) {

    console.log($scope.config);

    var gauge = this;

    var opts = {
      angle: 0, // The span of the gauge arc
      lineWidth: 0.44, // The line thickness
      radiusScale: 0.96, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#6FADCF',   // Colors
      colorStop: '#A3BD31',    // just experiment with them
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support

    };
    var target = document.getElementById('gauge-test'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = $scope.config.max; // set max gauge value
    gauge.setMinValue($scope.config.min);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set($scope.config.value); // set actual value

    // Mock interval to check the component
    $interval(function () {
      $scope.config.value = Math.random() * $scope.config.max;
      gauge.set($scope.config.value);
    }, 1000);

  });

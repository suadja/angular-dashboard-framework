/* *
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
        title: "Sample 01",
        structure: "4-8",
        rows: [{
          columns: [{
            styleClass: "col-md-6",
            widgets: [
              {
                type: "gauge",
                title: "Bandwidth usage",
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
          }, {
            styleClass: "col-md-6",
            widgets: [{
              type: "gauge",
              title: "Bandwidth usage",
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
        }]
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

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('quotation', {url: "/", templateUrl: "partials/quotation.html"})
	.state('templates', {url: "/templates", templateUrl: "partials/templates.html"})
});

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.allTemplates = [
    {
    	name: 'Template 1',
    	path: 'templates/template1.html'
    },
    {
    	name: 'Template 2',
    	path: 'templates/template2.html'
    }
    ];
    $rootScope.products = [
    	{id: 1, title: 'IP Camera', unitPrice: 2500, unit: 'pc(s)', quantity: 4},
    	{id: 2, title: 'Cat 6 Cable', unitPrice: 18, unit: 'yd(s)', quantity: 50},
    	{id: 3, title: 'Dome Camera', unitPrice: 1900, unit: 'pc(s)', quantity: 5},
    	{id: 4, title: 'Power Cable', unitPrice: 22, unit: 'yd(s)', quantity: 50}
    ];
}]);

app.controller('quotationCtrl', ['$scope', '$rootScope', '$filter', function($scope, $rootScope, $filter){
	$scope.frmData = {};
	$scope.selectedProducts = {};
	$scope.frmData.template = {};
	$scope.frmData.template = $rootScope.allTemplates[0];
	$scope.frmData.clientCompany = 'Some Client Ltd.';
	$scope.frmData.subject = 'Quotation for Blah Blah product';
	$scope.frmData.introText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

	$scope.myInfo = {
		name: 'Raihan Shikder',
		title: 'Marketing Executive',
		orgName: 'My Organization Ltd.',
		orgAddress: '121/222, Bara Moghbazar, Dhaka-1203',
		orgTel: '+88 01712 345 678',
		email: 'info@webjarbd.com',
		orgWeb: 'http://www.webjarbd.com',
		orgLogo: 'img/Superman_logo.png'
	};
	
	$scope.changedValue = function(item){
		$scope.frmData.template = item;
	}

	$scope.print = function() {
		var printContents = document.getElementById('result-block').innerHTML;
		var popupWin = window.open('', '_blank', 'width=500,height=600');
		popupWin.document.open()
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="vendor/bootstrap/dist/css/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
	}

	$scope.updateProductSelection = function (checkBox) {
	    $scope.selectedProducts = $filter('filter')($rootScope.products, {checked: true});
	}

	$scope.getGrandTotal = function(){
		var total = 0;
		for(var i = 0; i < $scope.selectedProducts.length; i++){
			var product = $scope.selectedProducts[i];
			total += (product.unitPrice * product.quantity);
		}
		return total;
	}
}]);

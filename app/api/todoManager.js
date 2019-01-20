var todoManagerApiRoutes = require('express').Router();

var Web3 = require('web3');
var config = require('../config/config')

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log(web3.net.peerCount);
}

web3.eth.defaultAccount = web3.eth.coinbase;

var todoManagerContractAddress = config.todoManagerContractAddress;


// now contract interface
var todoManagerContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_password",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "addTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "checkTodoList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "uncheckTodoList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "uint256"
			},
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "displayTaskStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_actionPerformed",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "UserEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_actionPerformed",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "TodolistEvent",
		"type": "event"
	}
];

//now contract initiation
var todoManagerContract = web3.eth.contract(todoManagerContractABI).at(todoManagerContractAddress);

todoManagerApiRoutes.get('/', function(req, res) {

    res.send("TODO Manager API server");

});

todoManagerApiRoutes.post('/registerUser', function(req, res) {

    var userId = req.body._userId;
    var password = req.body._password;


    todoManagerContract.registerUser.sendTransaction(userId, password, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

todoManagerApiRoutes.post('/addTask', function(req, res) {

    var userId = req.body._userId;
    var task = req.body._task;


    todoManagerContract.addTask.sendTransaction(userId, task, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

todoManagerApiRoutes.post('/checkTodoList', function(req, res) {

    var userId = req.body._userId;
    var task = req.body._task;


    todoManagerContract.checkTodoList.sendTransaction(userId, task, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

todoManagerApiRoutes.post('/uncheckTodoList', function(req, res) {

    var userId = req.body._userId;
    var task = req.body._task;


    todoManagerContract.uncheckTodoList.sendTransaction(userId, task, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

todoManagerApiRoutes.post('/login', function(req, res) {

    var userId = req.body._userId;
    var password = req.body._password;

    todoManagerContract.login.call(userId, password, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "isValidUser" : result
            });
        } else
            res.status(401).json("Error" + err);
    });

})

todoManagerApiRoutes.post('/displayTaskStatus', function(req, res) {

    var userId = req.body._userId;
    var task = req.body._task;

    todoManagerContract.displayTaskStatus.call(userId, task, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "taskStatus" : result
            });
        } else
            res.status(401).json("Error" + err);
    });

})


todoManagerApiRoutes.get('/getUserLogs', function(req, res) {

    var userEvent = todoManagerContract.UserEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    userEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            return res.json("Error" + err);
    });

})

todoManagerApiRoutes.get('/getTodoListLogs', function(req, res) {

    var todolistEvent = todoManagerContract.TodolistEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    todolistEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            return res.json("Error" + err);
    });

})

module.exports = todoManagerApiRoutes;

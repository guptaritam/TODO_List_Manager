pragma solidity ^ 0.4.17;

contract Todo{
   
    uint userId;
    struct User{
        string password;
        string[] tasks;
        mapping(string => bool) tasksStatus;
    }
    mapping(uint => User) users; 
    mapping(uint => bool) isUserRegistered;  
    
    //event declaration for keeping logs
    event UserEvent(string _actionPerformed, uint _userId, uint256 _timestamp);
    event TodolistEvent(string _actionPerformed, uint _userId, uint256 _timestamp);
    
    //function for registering user
    function registerUser(uint _userId, string _password){
        require(isUserRegistered[_userId] == false);
        users[_userId].password = _password;
        isUserRegistered[_userId]=true;
        
        UserEvent("USER REGISTERED", _userId, now);
    }
    
    //function for checking valid login attempt. It returns true for successful validation.
    function login(uint _userId, string _password) returns (bool){
        require(isUserRegistered[_userId] == true);
        if(stringsEqual(users[_userId].password, _password) == true)
            return true; 
        else 
            return false;
    }
    
    //function for adding a task to the TODO list 
    function addTask(uint _userId, string _task){
        require(isUserRegistered[_userId] == true);
        users[_userId].tasks.push(_task);
        //users[_userId].tasksStatus.push(false);
        users[_userId].tasksStatus[_task] = false;
        
        TodolistEvent("TASK ADDED", _userId, now);
    }
    
    //function for checking an item in the TODO list
    function checkTodoList(uint _userId, string _task){
        require(isUserRegistered[_userId] == true);
        users[_userId].tasksStatus[_task] = true;
        
        TodolistEvent("TASK CHECKED", _userId, now);
    }
    
    //function for unchecking an item in the TODO list
    function uncheckTodoList(uint _userId, string _task){
        require(isUserRegistered[_userId] == true);
        users[_userId].tasksStatus[_task] = false;
        
        TodolistEvent("TASK UNCHECKED", _userId, now);
    }
    
    //function for displaying a task's status (whether checked or unchecked). It returns true for checked.
    function displayTaskStatus(uint _userId, string _task) returns(bool){
        require(isUserRegistered[_userId] == true);
        return users[_userId].tasksStatus[_task];
    }
    
    //helper functions 
    function stringsEqual(string storage _a, string memory _b) internal returns(bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
            return false;
        for (uint i = 0; i < a.length; i++)
            if (a[i] != b[i])
                return false;
        return true;
    }
}


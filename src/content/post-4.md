---
title: "JavaScript Scope"
date: "2019-11-11"
draft: true
path: "/blog/js-scope"
---
JavaScript has two types of scope: global scope and local scope. The purpose of the scope is to provide access to all variables and functions within a certain execution context.

##Global Scope
When a variable is declared outside of any function it belongs to the global scope automatically and can be accessed from anywhere in the program, be it a function or any block.

```
const myPet = 'dog';   // belongs to the Global scope

function getPetInfo(){
  window.treats = 5;     // as well belongs to the Global scope
}
```

In the browser, variables in the global scope belong to the global window object.

JavaScript is a garbage-collected language, it stores all variables while executing the program and removes them after. So if a variable comes into existence during the execution of the function, and the variable is used inside the function and then the function ends, at that point the variable is no longer needed, so its memory can be reclaimed and JavaScript removes this variable from the memory. But global variables remain in memory for the entire time the application is running and clogs up it, which slows down the program. Point being, you should avoid defining global variables.

##Local Scope
ES6 introduced block-scoped variables using the const and let keywords. With these keywords, local scope is created and exists within the innermost block that surrounds it.

Each block has its own execution context which defines what data it has access to, as well as how it should behave. When code is executed in a context, a scope chain is created. It includes all declared variables and functions inside that block, then the data from the containing (parent) context, and so on. This pattern continues until the global context is reached.

Let’s have a look at an example:
```let dogMood = 'anxious';

function changeMood(newMood){
  if (dogMood === 'anxious'){
    dogMood = newMood;
  } else {
    dogMood = 'anxious';
  }
}

changeMood('happy');
```

The function changeMood has a scope chain with two objects in it: its own variable object (newMood) and the global context’s variable object dogMood. The function has access to dogMood because it’s part of its scope chain.

I hope that helps a bit, honestly it helped me to write it out like that. It's far from comprehensive and probably wrong about something, for a better explanation here's Kyle Simpson's book on Scope, which I'd highly recommend: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md
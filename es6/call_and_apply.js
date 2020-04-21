var log =  console.log.bind(console)

Function.prototype.call2 = function(context, ...args) {
    log(context.fn)
    context.fn = this
    context.fn(...args)
}

var obj = {
    value: 1
}

function bar (name, age) {
    return {        
        value: this.value,        
        name: name,        
        age: age    
    }
}

bar.call2(obj, 'kevin', 18) 

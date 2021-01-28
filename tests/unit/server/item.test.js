const expect = require('expect');


const add = (x,y) => x + y;

it("should add two numbers", ()=>{
    setTimeout(()=>{
        const result = add(2,3);
        expect(result).toBe(5);
        done()
    },1000)
   
})
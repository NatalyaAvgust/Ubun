class TestClass{
    constructor(){
        console.log('Call from constructor', this.field1)
        this.field1='test field 1'
    }
    logClassFiels(){
        console.log(this.field1)
    }
}
new TestClass().logClassFiels()
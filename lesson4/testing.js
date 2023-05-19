let object = {
  context: this,
  foo() {
    console.log(object.context);
  },
};

object.foo();
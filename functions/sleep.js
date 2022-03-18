module.exports = {
    name: "sleep",
    description: "resolves promise after time has elapsed (defined in the time param)",
 execute(x, time) {


    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, time);
    });


  }};
export const isStrongPassword = (pass) => {
  var protect = 0;

  if (pass.length < 8) {
    return "Слабый";
  }

  console.log(pass);

  //a,s,d,f
  var small = "([a-z]+)";
  if (pass.match(small)) {
    protect++;
  }

  //A,B,C,D
  var big = "([A-Z]+)";
  if (pass.match(big)) {
    protect++;
  }
  //1,2,3,4,5 ... 0
  var numb = "([0-9]+)";
  if (pass.match(numb)) {
    protect++;
  }
  //!@#$
  var vv = /\W/;
  if (pass.match(vv)) {
    protect++;
  }

  if (protect === 2) {
    return "Средний";
  }
  if (protect === 3) {
    return "Хороший";
  }
  if (protect === 4) {
    return "Высокий";
  }
};

// test met buffers
run();

function run() {
  var buf = [];
  buf[0] = createBuffer();
  buf[1] = Buffer.from([10, 20, 30, 40, 50]);
  buf[2] = Buffer.from("test", 'utf8');
  buf[3] = Buffer.from("")
  for (var i = 0; i < buf.length; i++) {
    printBuffer(buf[i]);
  }
}


function createBuffer() {
  var buffer = new Buffer(26);
  for (var i = 0 ; i < 26 ; i++) {
    buffer[i] = i + 97;
  }
  return buffer;
}

function printBuffer(buffer) {
  console.log( buffer.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
  console.log( buffer.toString('ascii',0,5));   // outputs: abcde
  console.log( buffer.toString('utf8',0,5));    // outputs: abcde
  console.log( buffer.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde
  console.log(buffer);
}

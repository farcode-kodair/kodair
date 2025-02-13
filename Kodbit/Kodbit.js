let canvas = document.getElementById("canvas");
let code = document.getElementById("code");
let p = document.getElementById("p");
let d = document.getElementById("d");
let x = canvas.getContext("2d");

let golf = `
// Sound player
t=(i,n)=>(n-i)/n;
A=new AudioContext()
m=A.createBuffer(1,96e3,48e3)
b=m.getChannelData(0)
for(i=96e3;i--;)b[i]=f(i)
s=A.createBufferSource()
s.buffer=m
s.connect(A.destination)
s.start()`;

p.onclick = function(){
  eval(code.value);
  draw();
}

window.onload = function(){
  ex(1, 0);
}

let examples = [

[
"noise",
`f = function(i){
  return Math.random() * 2 - 1;
}`
],

[
"shoot0",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.pow(i*50,0.7)&93)?q:-q;
}`
],

[
"shoot1",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.pow(i*50,0.7)&33)?q:-q;
}`
],

[
"shoot2",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.pow(i*50,0.8)&34)?q:-q;
}`
],

[
"shoot3",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return (Math.pow(i*500000,0.3)&33)?q:-q;
}`
],

[
"shoot4",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return (Math.pow(i*50,0.8)&34)?q:-q;
}`
],

[
"shoot5",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return (Math.pow(i*50,0.8)&66)?q:-q;
}`
],

[
"shoot6",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return (Math.pow(i*50,0.8)&133)?q:-q;
}`
],

[
"jump0",
`f = function(i){
  var n = 1e4;
  if (i>n) return null;
  return ((Math.pow(i,1.055)&128)?1:-1)*Math.pow(t(i,n),2);
}`
],

[
"jump1",
`f = function(i){
  var n=1.3e4;
  var c=n/3;
  if (i > n) return null;
  var q=Math.pow(t(i,n),3.1);
  return (Math.pow(i,1.08)&(i<c?98:99))?q:-q;
}`
],

[
"jump2",
`f = function(i){
  i=i*1.5;
  var n = 2e4;
  if (i>n) return null;
  return ((Math.pow(i,1.075)&128)?1:-1)*Math.pow(t(i,n),2);
}`
],

[
"jump3",
`f = function(i){
  i=i*1.5;
  var n = 2e4;
  if (i>n) return null;
  return ((Math.pow(i,1.055)&128)?1:-1)*Math.pow(t(i,n),2);
}`
],

[
"jump4",
`f = function(i){
  i=i*1.4;
  var n = 2e4;
  if (i>n) return null;
  return ((Math.pow(i,1.055)&130)?1:-1)*Math.pow(t(i,n),2);
}`
],

[
"jump5",
`f = function(i){
  i=i*0.75;
  var n=1.3e4;
  var c=n/3;
  if (i > n) return null;
  var q=Math.pow(t(i,n),3.1);
  return (Math.pow(i,1.08)&(i<c?98:99))?q:-q;
}`
],

[
"die0",
`f = function(i){
  var n=5e4;
  if (i > n) return null;
  return ((Math.pow(i,0.9)&200)?1:-1)*Math.pow(t(i,n),3);
}`
],

[
"die1",
`f = function(i){
  i=Math.pow(i,0.96)*1.3;
  var n=9e4;
  if (i > n) return null;
  return (((i+Math.sin(i/1900)*80)&64)?1:-1)*Math.pow(t(i,n),3);
}`
],

[
"die2",
`f = function(i){
  var n=5e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1-Math.sin(i/n1))*5.3;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n);
}`
],

[
"die3",
`f = function(i){
  var n=5e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1.2-Math.sin(i/n1))*7;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n);
}`
],

[
"die4",
`f = function(i){
  var n=6e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1.2-Math.sin(i/n1))*7;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n);
}`
],

[
"die5",
`f = function(i){
  var n=5e4;
  var n1=1e5;
  if (i > n) return null;
  i=Math.pow(i,1.2-Math.sin(i*2/n1))*6;
  var x=Math.sin(i/30+Math.sin(i/1500));
  return Math.pow(x,9)*t(i,n);
}`
],

[
"glitch0",
`f = function(i){
  var n=5e4;
  if (i > n) return null;
  return ((Math.pow(i+Math.sin(i*0.01)*1000,0.9)&200)?1:-1)*Math.pow(t(i,n),1);
}`
],

[
"glitch1",
`f = function(i){
  var n=5e4;
  if (i > n) return null;
  return ((Math.pow(i+Math.sin(i*0.01)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1);
}`
],

[
"glitch2",
`f = function(i){
  var n=1e5;
  if (i > n) return null;
  return ((Math.pow(Math.pow(i,0.9)+Math.sin(i*1.06)*1000,0.8)&200)?0.5:-0.5)*Math.pow(t(i,n),1);
}`
],

[
"coin0",
`f = function(i){
  var n=1e4;
  var c=n/3;
  if (i > n) return null;
  var q=Math.pow(t(i,n),2.1);
  return (Math.pow(i,3)&(i<c?16:99))?q:-q;
}`
],

[
"coin1",
`f = function(i){
  var n=1.6e4;
  var c=n/7;
  if (i > n) return null;
  var q=Math.pow(t(i,n),2.1);
  return (i<c ? ((i+Math.sin(-i/900)*10)&16) : i&13) ?q:-q;
}`
],

[
"win0",
`f = function(i){
  var notes = [0,4,7,12,undefined,7,12];
  var n=3.5e4;
  if (i > n) return null;
  var idx = ((notes.length*i)/n)|0;
  var note = notes[idx];
  if (note === undefined) return 0;
  var r = Math.pow(2,note/12)*0.8;
  var q = t((i*notes.length)%n,n);
  return ((i*r)&64)?q:-q
}`
],

[
"what0",
`f = function(i){
  var n=1e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.01*Math.sin(i*0.4)+Math.sin(i/100));
}`
],

[
"what1",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.1*Math.pow(0.9,i*0.01)+Math.sin(i/10));
}`
],

[
"what2",
`f = function(i){
  var n=1e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i/55*Math.sin(i/99)+Math.sin(i/100))*q;
}`
],

[
"what3",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i)+Math.sin(i/100));
}`
],

[
"what4",
`f = function(i){
  var n=1e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.01*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what5",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what6",
`f = function(i){
  var n=11e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what7",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(-i*0.003*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what8",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what9",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.04;
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q;
}`
],

[
"what10",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.7;
  return Math.sin(Math.pow(i,0.9)*0.03*Math.sin(0.09*Math.pow(i,1.1)+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what11",
`f = function(i){
  var n=2e4;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.1;
  return Math.sin(Math.pow(i,0.9)*0.03*Math.sin(0.09*Math.pow(i,1.1)+Math.sin(i/200))+Math.sin(i/100))*q*q;
}`
],

[
"what12",
`f = function(i){
  var n=25000;
  if (i > n) return null;
  return ((((i^(i>>3))^(i*i*7.3)^(i<<4))&65535)/65536)*t(i,n);
}`
],

[
"rumbl",
`f = function(i){
  var n=4e4;
  if (i > n) return null;
  return Math.sin(i/1000 - Math.sin(i/100)*Math.sin(i/61))*t(i,n);
}`
],

[
"rumb2",
`f = function(i){
  var n=4e4;
  if (i > n) return null;
  return Math.sin(i/2000 - Math.sin(i/331)*Math.sin(i/61))*t(i,n);
}`
],

[
"rumb3",
`f = function(i){
  var n=3e4;
  if (i > n) return null;
  return Math.sin(i/2000 - Math.sin(i/331)*Math.sin(i/61) + Math.sin(Math.sin(i/59)/39) * 33)*t(i,n);
}`
]
];

for(let e in examples){
  d.innerHTML += "<button onclick=ex("+e+")>"+examples[e][0]+"</button>";
}

function ex(e, play=1){
  code.value = "// Sound\n" + examples[e][1] + golf;
  if(play){
    p.click();
  }
}

function draw() {
  canvas.width ^= 0;
  x.moveTo(0, 75);
  for(let i=96e3;i--;) x.lineTo(i/100, f(i) * 65 + 75);
  x.stroke();
}
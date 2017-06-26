App = Ember.Application.create();

App.CanvasThingComponent = Ember.Component.extend({
  tagName: 'canvas',
  width: 2000,
  height: 1000,
  attributeBindings: ['width','height'],
  colors : [   "#B8D430", "#3AB745", "#029990", "#3501CB",
                   "#2E2C75", "#673A7E", "#CC0071", "#F80120",
                   "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],
  selectedColorIndex : 0,//This will be as per the choice of user.
  correspondingColorIndex : 0,//This is the index of selected color in the index array.
  index: [0,1,2,3,4,5,6,7,8,9,10,11],
  startAngle : 0,
  arc : Math.PI / 6,
  data: 'hi',
  characters : '0123456789ABCDEFGHIJKLIMN'.split(''),
  init: function() {
   this._super.apply(this, arguments);

   if (this.get("delegate")) {
      this.get('delegate').set(this.get("property") || "default", this);
   }
  },
  didInsertElement: function() {
    // gotta set ctxf here instead of in init because
    // the element might not be in the dom yet in init
    this.set('ctx', this.get('element').getContext('2d'));
    this._empty();
    this.draw();
  },
  
  draw: function() {
    this._empty();
    var ctx = this.get('ctx');
    var startAngle = this.get('startAngle');
  	var arc = Math.PI / 6;
  	var characters = this.get('characters');
  	var index=this.get('index');
  	var colors = this.get('colors');

  	var selectedColorIndex = this.get('selectedColorIndex');//This will be as per the choice of user.
  	var correspondingColorIndex = this.get('correspondingColorIndex');//This is the index of selected color in the index array.
    var outsideRadius = 200;
    var insideRadius = 125;
    var innerTextRadius = 70;
    var outerTextRadius = 110;
    ctx.clearRect(0,0,2000,1000);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = 'bold 20px Helvetica, Arial';

    for(var i = 0; i < 12; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[index[i]];
   
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.lineWidth = 0.1;
      ctx.fillStyle = "black";
      //outer dial of characters
      ctx.save();
      ctx.translate(250 + Math.cos(i*arc + arc/2) * outerTextRadius ,
                    250 + Math.sin(i*arc + arc/2) * outerTextRadius);
      //ctx.rotate(i*arc + arc/2 + Math.PI/2);
      var text = characters[i+12];
      ctx.fillText( text , -ctx.measureText(text).width/2 ,5);
      ctx.restore();

       //inner dial of characters
      ctx.save();
      ctx.translate(250 + Math.cos(i*arc + arc/2) * innerTextRadius ,
                    250 + Math.sin(i*arc + arc/2) * innerTextRadius);
      //ctx.rotate(i*arc + arc/2 + Math.PI/2);
      text = characters[i];
      ctx.fillText( text , -ctx.measureText(text).width/2 ,5);
      ctx.restore();
    }

  //spokes
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(var i = 0; i<12; i++){
      ctx.moveTo(250,250);
      ctx.lineTo(250 + Math.cos(i*arc) * insideRadius , 250 + Math.sin(i*arc) * insideRadius);
      ctx.stroke();
    }
  }.observes('width', 'height', 'data'),
  
  _empty: function() {
    var ctx = this.get('ctx');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, this.get('width'), this.get('height'));
  },
  rotateClockwise: function() {
    this.set('startAngle', this.get('startAngle') + this.get('arc'));
    this.draw();
  }

});

  // var colors = [   "#B8D430", "#3AB745", "#029990", "#3501CB",
  //                  "#2E2C75", "#673A7E", "#CC0071", "#F80120",
  //                  "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];

  // var selectedColorIndex = 0;//This will be as per the choice of user.
  // var correspondingColorIndex = 0;//This is the index of selected color in the index array.

  // // var index = [];
  // // for( var i=0;i<12;i++){
  // //   index[i] = i;
  // // }

  // var characters = '0123456789ABCDEFGHIJKLIMN'.split('');

  // var startAngle = 0;
  // var arc = Math.PI / 6;
  // //var ctx;

  // function drawRouletteWheel() {
  //   var canvas = document.getElementById("canvas");
  //   if (canvas.getContext) {
  //     var outsideRadius = 200;
  //     var insideRadius = 125;
  //     var innerTextRadius = 70;
  //     var outerTextRadius = 110;
     
  //     ctx = canvas.getContext("2d");
  //     ctx.clearRect(0,0,2000,1000);
     
  //     ctx.strokeStyle = "black";
  //     ctx.lineWidth = 2;
     
  //     ctx.font = 'bold 20px Helvetica, Arial';

  //     for(var i = 0; i < 12; i++) {
  //       var angle = startAngle + i * arc;
  //       ctx.fillStyle = colors[index[i]];
       
  //       ctx.beginPath();
  //       ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
  //       ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
  //       ctx.stroke();
  //       ctx.fill();

  //       ctx.lineWidth = 0.1;
  //       ctx.fillStyle = "black";
  //       //outer dial of characters
  //       ctx.save();
  //       ctx.translate(250 + Math.cos(i*arc + arc/2) * outerTextRadius ,
  //                     250 + Math.sin(i*arc + arc/2) * outerTextRadius);
  //       //ctx.rotate(i*arc + arc/2 + Math.PI/2);
  //       var text = characters[i+12];
  //       ctx.fillText( text , -ctx.measureText(text).width/2 ,5);
  //       ctx.restore();

  //       //inner dial of characters
  //       ctx.save();
  //       ctx.translate(250 + Math.cos(i*arc + arc/2) * innerTextRadius ,
  //                     250 + Math.sin(i*arc + arc/2) * innerTextRadius);
  //       //ctx.rotate(i*arc + arc/2 + Math.PI/2);
  //       text = characters[i];
  //       ctx.fillText( text , -ctx.measureText(text).width/2 ,5);
  //       ctx.restore();
  //     }

  //     //spokes
  //     ctx.strokeStyle = "black";
  //     ctx.lineWidth = 1;
  //     ctx.beginPath();
  //     for(var i = 0; i<12; i++){
  //       ctx.moveTo(250,250);
  //       ctx.lineTo(250 + Math.cos(i*arc) * insideRadius , 250 + Math.sin(i*arc) * insideRadius);
  //       ctx.stroke();
  //     }
      
  //   }

  //   //selectInnerWheel();
  // }

  // drawRouletteWheel();

  // function rotateClockwise() {
  //   startAngle += arc;
  //   drawRouletteWheel();
  // }

  // function rotateAnticlockwise() {
  //   startAngle -= arc;
  //   drawRouletteWheel();
  // }

  // function randomiseIndexArray() {
  //   var pos = 0;
  //   var x;
  //   var j;
  //   while(pos<12){
  //     x = Math.floor(Math.random() * 12);
      
  //     for(j=0;j<pos;j++){
  //       if(x==index[j]){
  //         break;
  //       }
  //     }

  //     if(j==pos){
  //       index[pos++] = x;
  //     }
  //   }

  //   j=0;
  //   while(index[j] != selectedColorIndex){
  //     j++;
  //   }
  //   correspondingColorIndex = j;
  //   drawRouletteWheel();
  // }

  // function selectInnerWheel(){
  //   drawRouletteWheel();
  //   var selectedIndex = ( correspondingColorIndex + Math.round(startAngle/arc) + 12000 ) % 12 ;

  //   var text1 = "selected character : " + characters[selectedIndex] ;
  //   ctx.fillText( text1 , 500 , 250 );
  // }

  // function selectOuterWheel(){
  //   drawRouletteWheel();
  //   var selectedIndex = ( correspondingColorIndex + Math.round(startAngle/arc) + 12000 ) % 12 ;

  //   var text1 = "selected character : " + characters[selectedIndex + 12] ;
  //   ctx.fillText( text1 , 500 , 250 );
  // }
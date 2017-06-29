App = Ember.Application.create();

App.CanvasThingComponent = Ember.Component.extend({
  tagName: 'canvas',
  width: 2000,
  height: 1000,
  attributeBindings: ['width','height'],
  colors : [   "#B8D430", "#3AB745", "#029990", "#3501CB",
                   "#2E2C75", "#673A7E", "#CC0071", "#F80120",
                   "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],//This will be as per the choice of user.
  correspondingColorIndex : 0,//This is the index of selected color in the index array.
  index: [0,1,2,3,4,5,6,7,8,9,10,11],
  startAngle : 0,
  arc : Math.PI / 6,
  data: 'hi',
  characters : '0123456789ABCDEFGHIJKLIMN'.split(''),
  clockwise: 0,
  anticlockwise: 0,
  dial: Ember.inject.controller(),
  inner: true,
  outer: true,
  onClockwise: function() {
    this.rotateClockwise();
  }.observes('clockwise'),

  onAnticlockwise: function(){
    this.rotateAnticlockwise();
  }.observes('anticlockwise'),

  onInner: function(){
    this.selectInnerWheel();
    this.randomiseIndexArray();
  }.observes('inner'),

  onOuter: function() {
    this.selectOuterWheel();
    this.randomiseIndexArray();
  }.observes('outer'),

  didInsertElement: function() {
    // gotta set ctxf here instead of in init because
    // the element might not be in the dom yet in init
    this.set('ctx', this.get('element').getContext('2d'));
    this._empty();
    this.set('correspondingColorIndex', this.get('selectedColorIndex'));
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
      ctx.arc(625, 200, outsideRadius, angle, angle + arc, false);
      ctx.arc(625, 200, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.lineWidth = 0.1;
      ctx.fillStyle = "black";
      //outer dial of characters
      ctx.save();
      ctx.translate(625 + Math.cos(i*arc + arc/2) * outerTextRadius ,
                    200 + Math.sin(i*arc + arc/2) * outerTextRadius);
      //ctx.rotate(i*arc + arc/2 + Math.PI/2);
      var text = characters[i+12];
      ctx.fillText( text , -ctx.measureText(text).width/2 ,5);
      ctx.restore();

       //inner dial of characters
      ctx.save();
      ctx.translate(625 + Math.cos(i*arc + arc/2) * innerTextRadius ,
                    200 + Math.sin(i*arc + arc/2) * innerTextRadius);
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
      ctx.moveTo(625,200);
      ctx.lineTo(625 + Math.cos(i*arc) * insideRadius , 200 + Math.sin(i*arc) * insideRadius);
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
  },

  rotateAnticlockwise: function() {
    this.set('startAngle', this.get('startAngle') - this.get('arc'));
    this.draw();
  },

  selectInnerWheel: function(){
    var selectedIndex = ( this.get('correspondingColorIndex') + Math.round(this.get('startAngle')/this.get('arc')) + 12000 ) % 12 ;
    console.log(selectedIndex + ' ' + this.get('correspondingColorIndex'));
    this.get('dial').set('password',this.get('dial').get('password') + this.get('characters')[selectedIndex]) ;
    
  },
  selectOuterWheel: function(){
    var selectedIndex = ( this.get('correspondingColorIndex') + Math.round(this.get('startAngle')/this.get('arc')) + 12000 ) % 12 ;
    this.get('dial').set('password',this.get('dial').get('password') + this.get('characters')[selectedIndex + 12]) ;
  },
  randomiseIndexArray: function() {
    var pos = 0;
    var x;
    var j;
    var index = this.get('index');
    var self =this;
    while(pos<12){
      x = Math.floor(Math.random() * 12);
      
      for(j=0;j<pos;j++){
        if(x==index[j]){
          break;
        }
      }

      if(j==pos){
        index[pos++] = x;
      }
    }
    this.set('index',index);
    j=0;
    while(index[j] != this.get('selectedColorIndex')){
      j++;
    }
    self.set('correspondingColorIndex', j);
    this.set('startAngle', 0);
    console.log(this.get('correspondingColorIndex'));
    this.draw();
  }

});

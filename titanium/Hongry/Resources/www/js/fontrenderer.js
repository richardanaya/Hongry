FontRenderer = function(font) {
	this.font = font;
	var canvas = document.createElement('canvas');
	canvas.width = font.width;
	canvas.height = font.height;
	var ctx = canvas.getContext('2d');	
	ctx.drawImage(font,0,0);
	var n = (126-32)*2; //twice the number of letters we render
	var imgd = ctx.getImageData(0,0, n, 1);
	var pix = imgd.data;
	
	this.font_data = [];
	for(var i = 0; i <n; i++ ) {
		this.font_data.push(pix[i*4+0]<<16|pix[i*4+1]<<8|pix[i*4+2]);
	}	
}

FontRenderer.prototype.drawText = function(ctx,s,x,y) {
	var h = this.font.height-1; //account for data row
	for(var i = 0; i < s.length ; i++ ) {
		var c = s.charCodeAt(i)-32;	
		var sx = this.font_data[c*2];
		var w = this.font_data[(c*2)+1]-sx;
		this.renderCharacter(ctx,sx,1,w,h,x,y); //accoutn for data row
		x+=w;
	}
}

FontRenderer.prototype.getTextWidth = function(s) {
	var w = 0;
	for(var i = 0,len=s.length; i < len ; i++ ) {
		var c = s.charCodeAt(i)-32;	
		var sx = this.font_data[c*2];
		w += this.font_data[(c*2)+1]-sx;
	}
	return w;
}

FontRenderer.prototype.getTextHeight = function(s) {
	return this.font.height-1;
}

FontRenderer.prototype.renderCharacter = function(ctx,sx,sy,w,h,x,y) {
	ctx.drawImage(this.font,sx,sy,w,h,x,y,w,h);
}

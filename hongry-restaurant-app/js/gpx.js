var fontCoordinates = [1, 1, 4, 16, 14, 1, 8, 16, 31, 1, 4, 16, 44, 1, 9, 16, 62, 1, 6, 16, 77, 1, 11, 16, 97, 1, 9, 16, 115, 1, 7, 16, 131, 1, 4, 16, 144, 1, 4, 16, 157, 1, 6, 16, 172, 1, 8, 16, 189, 1, 8, 16, 206, 1, 4, 16, 219, 1, 8, 16, 236, 1, 5, 16, 1, 26, 7, 16, 17, 26, 4, 16, 30, 26, 7, 16, 46, 26, 7, 16, 62, 26, 7, 16, 78, 26, 7, 16, 94, 26, 7, 16, 110, 26, 7, 16, 126, 26, 7, 16, 142, 26, 7, 16, 158, 26, 8, 16, 175, 26, 8, 16, 192, 26, 7, 16, 208, 26, 8, 16, 225, 26, 7, 16, 241, 26, 6, 16, 1, 51, 13, 16, 23, 51, 10, 16, 42, 51, 8, 16, 59, 51, 8, 16, 76, 51, 8, 16, 93, 51, 8, 16, 110, 51, 7, 16, 126, 51, 9, 16, 144, 51, 8, 16, 163, 51, 2, 16, 178, 51, 6, 16, 193, 51, 9, 16, 211, 51, 7, 16, 227, 51, 10, 16, 246, 51, 8, 16, 263, 51, 9, 16, 1, 76, 8, 16, 18, 76, 9, 16, 36, 76, 8, 16, 53, 76, 8, 16, 70, 76, 8, 16, 87, 76, 8, 16, 104, 76, 10, 16, 123, 76, 14, 16, 146, 76, 8, 16, 163, 76, 8, 16, 180, 76, 8, 16, 197, 76, 3, 16, 209, 76, 5, 16, 223, 76, 3, 16, 235, 76, 6, 16, 250, 76, 8, 16, 1, 101, 3, 16, 13, 101, 6, 16, 28, 101, 6, 16, 43, 101, 6, 16, 58, 101, 6, 16, 73, 101, 6, 16, 88, 101, 5, 16, 102, 101, 6, 16, 117, 101, 6, 16, 134, 101, 2, 16, 148, 101, 4, 16, 161, 101, 6, 16, 178, 101, 2, 16, 192, 101, 10, 16, 211, 101, 6, 16, 226, 101, 6, 16, 1, 126, 6, 16, 16, 126, 6, 16, 31, 126, 4, 16, 44, 126, 6, 16, 59, 126, 4, 16, 72, 126, 6, 16, 87, 126, 6, 16, 102, 126, 10, 16, 121, 126, 6, 16, 136, 126, 6, 16, 151, 126, 6, 16, 166, 126, 4, 16, 179, 126, 8, 16, 196, 126, 4, 16, 209, 126, 8, 16, 273, 126, -1, 16]
FONT_SCALE = 1.0;
FONT = null;

function clear(color){
    ctx.fillStyle = BLACK;
    ctx.fillRect (0, 0, WIDTH, HEIGHT);
  }

function drawStringHelper(text, x, y) {
    var tx = x;
    var ty = y;
    for( var i = 0 ; i < text.length ; i++ ) {
            var j = (text[i].charCodeAt()-32)*4;
            ctx.drawImage(FONT, fontCoordinates[j],fontCoordinates[j+1],fontCoordinates[j+2],fontCoordinates[j+3],tx,ty,fontCoordinates[j+2]*FONT_SCALE,fontCoordinates[j+3]*FONT_SCALE);
            tx += fontCoordinates[j+2]*FONT_SCALE;
    }
  }

  function getStringWidth(text) {
    var width = 0;
    for( var i = 0 ; i < text.length ; i++ ) {
            var j = (text[i].charCodeAt()-32)*4;
            width += fontCoordinates[j+2];
    }
    return width*FONT_SCALE;
  }

  function getStringHeight() {
    return fontCoordinates[3]*FONT_SCALE;
  }

  function drawString(text,x,y,width,height) {
    var ss = text.split(" ");
    var ls = new Array();
    for(s in ss){
            ls.push(ss[s]);
            ls.push(" ");
    }
    ls.pop();

    var i = 0;

    var row = 0;
    while( i < ls.length) {
            if((row+1)*getStringHeight() > height)
            {
                    break;
            }

            var tw = 0;
            var ts = "";

            var maxed = false;
            while( tw <= width && i < ls.length) {
                    var cs = ls[i];
                    if( cs == " " && tw == 0) {
                            i++;
                            continue;
                    }
                    var nw = getStringWidth(cs);
                    if( tw + nw > width){
                            if(tw == 0){
                                    ls.splice(i,1);
                                    for(var j = cs.length-1; j>= 0 ; j--){
                                            ls.splice(i, 0, cs.substring(j,j+1));
                                    }
                                    continue;
                            }
                            maxed = true;
                            break;
                    }
                    tw += nw;
                    ts += cs;
                    i++;
            }

            if((row+2)*getStringHeight() > height && maxed && ts.length >= 3)
            {
                    ts = ts.substring(0, ts.length-3);
                    ts.trim();
                    ts += "...";
            }
            drawStringHelper(ts, x, y+row*getStringHeight());
            row++;
    }
  }

  function countPages(text, width, height) {
		var pages = 1;
		var ss = text.split(" ");
		var ls = new Array();
		for(var s in ss){
			ls.push(ss[s]);
			ls.push(" ");
		}
		ls.pop();

		var i = 0;

		var row = 0;
		while( i < ls.length) {
			if((row+1)*getStringHeight() > height)
			{
				pages++;
				row = 0;
			}

			var tw = 0;

			var maxed = false;
			while( tw <= width && i < ls.length) {
				var cs = ls[i];
				if( cs == " " && tw == 0) {
					i++;
					continue;
				}
				var nw = getStringWidth(cs);
				if( tw + nw > width){
					if(tw == 0){
						ls.splice(i,1);
						for(var j = cs.length-1; j>= 0 ; j--){
							ls.splice(i, 0, cs.substring(j,j+1));
						}
						continue;
					}
					maxed = true;
					i++;
					break;
				}
				tw += nw;
				i++;
			}

			row++;
		}
		return pages;
	}

	function drawStringPage(text, x, y, width, height, page) {

		var pages = 1;
		var ss = text.split(" ");
		var ls = new Array();
		for(s in ss){
			ls.push(ss[s]);
			ls.push(" ");
		}
		ls.pop();

		var i = 0;

		var row = 0;
		while( i < ls.length) {
			if((row+1)*getStringHeight() > height)
			{
				pages++;
				row = 0;
				if( pages -1 > page){
					return;
				}
			}

			var tw = 0;
			var ts = "";

			var maxed = false;
			while( tw <= width && i < ls.length) {
				var cs = ls[i];
				if( cs == " " && tw == 0) {
					i++;
					continue;
				}
				var nw = getStringWidth(cs);
				if( tw + nw > width){
					if(tw == 0){
						ls.splice(i,1);
						for(var j = cs.length-1; j>= 0 ; j--){
							ls.splice(i, 0, cs.substring(j,j+1));
						}
						continue;
					}
					maxed = true;
					break;
				}
				tw += nw;
				ts += cs;
				i++;
			}

			if((row+2)*getStringHeight() > height && maxed && ts.length >= 3)
			{
				ts = ts.substring(0, ts.length-3);
				ts.trim();
				ts += "...";
			}
			if( pages -1 == page) {
				drawStringHelper(ts, x, y+row*getStringHeight());
			}
			row++;
		}
	}

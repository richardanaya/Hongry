var fontCoordinates = [1, 1, 5, 17, 15, 1, 4, 17, 28, 1, 8, 17, 45, 1, 10, 17, 64, 1, 10, 17, 83, 1, 9, 17, 101, 1, 10, 17, 120, 1, 4, 17, 133, 1, 6, 17, 148, 1, 6, 17, 163, 1, 8, 17, 180, 1, 9, 17, 198, 1, 4, 17, 211, 1, 9, 17, 229, 1, 4, 17, 242, 1, 12, 17, 1, 27, 8, 17, 18, 27, 5, 17, 32, 27, 8, 17, 49, 27, 8, 17, 66, 27, 8, 17, 83, 27, 8, 17, 100, 27, 8, 17, 117, 27, 8, 17, 134, 27, 8, 17, 151, 27, 8, 17, 168, 27, 4, 17, 181, 27, 4, 17, 194, 27, 8, 17, 211, 27, 8, 17, 228, 27, 7, 17, 244, 27, 8, 17, 1, 53, 12, 17, 22, 53, 8, 17, 39, 53, 8, 17, 56, 53, 8, 17, 73, 53, 8, 17, 90, 53, 8, 17, 107, 53, 8, 17, 124, 53, 8, 17, 141, 53, 8, 17, 158, 53, 4, 17, 171, 53, 8, 17, 188, 53, 8, 17, 205, 53, 8, 17, 222, 53, 12, 17, 243, 53, 8, 17, 260, 53, 8, 17, 1, 79, 8, 17, 18, 79, 8, 17, 35, 79, 8, 17, 52, 79, 8, 17, 69, 79, 9, 17, 87, 79, 8, 17, 104, 79, 8, 17, 121, 79, 12, 17, 142, 79, 8, 17, 159, 79, 8, 17, 176, 79, 8, 17, 193, 79, 6, 17, 208, 79, 12, 17, 229, 79, 6, 17, 244, 79, 5, 17, 258, 79, 8, 17, 1, 105, 5, 17, 15, 105, 8, 17, 32, 105, 8, 17, 49, 105, 8, 17, 66, 105, 8, 17, 83, 105, 8, 17, 100, 105, 8, 17, 117, 105, 8, 17, 134, 105, 8, 17, 151, 105, 4, 17, 164, 105, 5, 17, 178, 105, 8, 17, 195, 105, 4, 17, 208, 105, 12, 17, 229, 105, 8, 17, 246, 105, 8, 17, 1, 131, 8, 17, 18, 131, 8, 17, 35, 131, 8, 17, 52, 131, 8, 17, 69, 131, 8, 17, 86, 131, 8, 17, 103, 131, 8, 17, 120, 131, 12, 17, 141, 131, 8, 17, 158, 131, 8, 17, 175, 131, 8, 17, 192, 131, 6, 17, 207, 131, 4, 17, 220, 131, 7, 17, 236, 131, 5, 17, 269, 131, -1, 17];

function clear(color){
    ctx.fillStyle = BLACK;
    ctx.fillRect (0, 0, WIDTH, HEIGHT);
  }

function drawStringHelper(text, x, y) {
    var tx = x;
    var ty = y;
    for( var i = 0 ; i < text.length ; i++ ) {
            var j = (text[i].charCodeAt()-32)*4;
            ctx.drawImage(imgFont, fontCoordinates[j],fontCoordinates[j+1],fontCoordinates[j+2],fontCoordinates[j+3],tx,ty,fontCoordinates[j+2],fontCoordinates[j+3]);
            tx += fontCoordinates[j+2];
    }
  }

  function getStringWidth(text) {
    var width = 0;
    for( var i = 0 ; i < text.length ; i++ ) {
            var j = (text[i].charCodeAt()-32)*4;
            width += fontCoordinates[j+2];
    }
    return width;
  }

  function getStringHeight() {
    return fontCoordinates[3];
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
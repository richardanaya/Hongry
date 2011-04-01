FONT = null;

function clear(color){
    ctx.fillStyle = BLACK;
    ctx.fillRect (0, 0, WIDTH, HEIGHT);
  }

function drawStringHelper(text, x, y) {
    FONT.drawText(ctx,text,Math.floor(x),Math.floor(y));
  }

  function getStringWidth(text) {
    return FONT.getTextWidth(text);
  }

  function getStringHeight(text) {
    return FONT.getTextHeight(text);
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
			if( maxed ) {
			  row++;
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

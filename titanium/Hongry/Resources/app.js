// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
/*Titanium.API.info(Titanium.Filesystem.applicationDataDirectory);
var path = Titanium.Filesystem.applicationDataDirectory+"/myFile.txt"
var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'myFile.txt');
f.write('this is the new file');
var g = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'myFile.txt');
var contents = g.read();
Titanium.API.info("Contents of the file = " + contents.text);*/
var path = "http://www.hongry.com/restaurant";//Titanium.Filesystem.resourcesDirectory+"/www/index.html";
Titanium.API.info(path);
var webview = Titanium.UI.createWebView({url:path});
webview.setBackgroundColor('#000');
var win3 = Titanium.UI.createWindow({navBarHidden:true});
win3.setBackgroundColor('#000');
win3.add(webview);
win3.open({modal:true});
/*var url = 'http://www.codeboxed.com';
        // Initialize the HTTPClient object
	var httpClient = Titanium.Network.createHTTPClient();
        
        // Connect to the url above
	if (httpClient.open('GET', url)) {
                // Create the temporary file
                // Set the path to desktop directory in our case
		var filePath = 	Titanium.Filesystem.getDesktopDirectory().toString()+
						Titanium.Filesystem.getSeparator()+
						'index.html';
                // Copy the temporary file to our path
		file.copy(filePath);

                // Handle the reveived data (Titanium.Filesystem.File can also be used as a handler)
		httpClient.receive(function(data) {
			var file = Titanium.Filesystem.getFile(window['filePath']);
                        // Open the file created before and write to it the received data
			var fileStream = file.open(Titanium.Filesystem.MODE_APPEND);
			fileStream.write(data);
			fileStream.close();
		});
	} else {
		Titanium.API.info('cannot open connection');
	}*/

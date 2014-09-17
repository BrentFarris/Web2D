if (WEB2D_DIR === "undefined")
	WEB2D_DIR = "";

function LoadModule(moduleFile) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	if (moduleFile.indexOf(".js") != moduleFile.length - 3) moduleFile += ".js";
	js.src = moduleFile;
	document.body.appendChild(js);
}

LoadModule(WEB2D_DIR + "arrayExtensions.js");
LoadModule(WEB2D_DIR + "event.js");
LoadModule(WEB2D_DIR + "framework.js");
LoadModule(WEB2D_DIR + "input.js");
LoadModule(WEB2D_DIR + "spriteSheet.js");
LoadModule(WEB2D_DIR + "canvas.js");

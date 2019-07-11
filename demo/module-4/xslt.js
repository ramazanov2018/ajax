/*
** Функции XSLT преобразования
*/ 

// Функция выполняет XSLT преобразование в объект
function xsltTransform(domXML, domXSL){
	try{
		if (window.XSLTProcessor){
			// Это Mozilla...
			var xsltProcessor = new XSLTProcessor(); 
			xsltProcessor.importStylesheet(domXSL); 
			var resultDOM = xsltProcessor.transformToDocument(domXML); 
			var serializer = new XMLSerializer();
			return serializer.serializeToString(resultDOM);
    }else if(!window.ActiveXObject && "ActiveXObject" in window){ 
      //EDGE
      // Загрузка XML файла
      var xml = new ActiveXObject("Msxml2.DOMDocument.3.0");
      xml.async = false;
      xml.resolveExternals = false;
      xml.loadXML((new XMLSerializer()).serializeToString(domXML));
      // Загрузка XSL файла
      var xslt = new ActiveXObject("Msxml2.XSLTemplate");
      var xsl = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
      xsl.async = false;
      xsl.loadXML(domXSL);
      xslt.stylesheet = xsl;
      // Преобразование
      var processor = xslt.createProcessor();
      processor.input = xml;
      processor.transform();
      return processor.output;
    }else if (window.ActiveXObject){
			// Это Internet Explorer < 11
			return domXML.transformNode(domXSL);
		}else{
			// Преобразования не поддерживаются...
			alert("К сожалению, Ваш браузер не поддерживает XSLT преобразования!");
			return null;
		}
	}catch (ex){
		alert("Ошика xsltTransform:\n" + ex);
	}
	
}
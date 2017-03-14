function GetWikipediaJSON(form)
{
	var search = form[0].value;
	if(!search){return;}
	
	var urlPart1 = "https://en.wikipedia.org/w/api.php/?action=query&format=json&prop=extracts|info&inprop=url&exinfo&exlaintext&exsentences=1&exlimit=max&";
	var urlPart2 = "generator=search&gsrnamespace=0&gsrlimit=10&callback=?&gsrsearch=";
	$.getJSON(urlPart1 + urlPart2 + search, CreateEntries);
}

function CreateEntry(wikiPageData) 
{
	var container = document.getElementById("Entries");
	var entry = document.createElement("wikiEntry");
	var title = document.createElement("wikiTitle");
	var body = document.createElement("wikiBody");
	
	var titleText = wikiPageData.title;
	var bodyText = wikiPageData.extract;
	var linkUrl = wikiPageData.fullurl;
	
	container.appendChild(entry);
	entry.appendChild(title);
	entry.appendChild(body);
	
	title.textContent = titleText;
	body.textContent = bodyText;
	entry.onclick = function(){window.open(linkUrl)};
}

function CreateEntries(data)
{
	var container = document.getElementById("Entries");
	while(container.hasChildNodes() )
	{
		container.removeChild(container.lastChild);
	}
	
	$.each(data.query.pages, function(key, page){CreateEntry(page)}  );
}

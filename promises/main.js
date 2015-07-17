var get=function(url){
	return new Promise(function(resolve,reject){
		var req=new XMLHttpRequest();
		req.open('GET',url);

		req.onload = function(){
			if(req.status==200){
				resolve(req.response);
			}else{
				reject(Error(req.statusText));
			}
		};

		req.onerror = function(){
			reject(Error("Network Error"));
		};

		req.send();
	});
};

var getJSON=function(url){
	return get(url).then(JSON.parse);
};

var storyDiv = $('.story');

var wrapContent=function(element,content){
	return $('<' + element + '/>').html(content);
}
var addHtmlToPage=function(content) {
  storyDiv.append(wrapContent('div',content));
};

var addTextToPage= function(content) {
   storyDiv.append(wrapContent('p',content));
};
var addChapterHtml=function(chapter) {
	addHtmlToPage(chapter.html);
};

var chain= function(first,next){
	return first.then(function(){return next;})
}
var addEachChapter=function(first, next) {
	return chain(first,next).then(addChapterHtml);
};

(function(){
	getJSON('story.json').then(function(story) {
	  addHtmlToPage(story.heading);
	  return story.chapterUrls.map(getJSON).reduce(addEachChapter, Promise.resolve());
	}).then(function() {
	  addTextToPage("All done");
	}).catch(function(err) {
  		addTextToPage("Argh, broken: " + err.message);
	}).then(function() {
  		$('.spinner').hide();
	});
})();
